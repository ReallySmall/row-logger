
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

ESP8266WiFiMulti WiFiMulti;
HTTPClient http;

const char machineId[] = "water_rower_a1";
const char damping[] = "2000"; // ml - however full your water tank is

char baseTime[14]; // the base time, which will be obtained from the API as millis from epoch

const byte rowingStrokesSwitch = 0; // DPIO connected to rower, triggers interrupt function

volatile char* rowingStrokesData[300]; // populated with csv of timestamps for rowing strokes
volatile long lastTriggered = 0; //the last time the interrupt pin was triggered

unsigned long lastPosted = millis(); // reference point for time elapsed since last post to API

int pulses = 0;
int multiplier = 10;

int timeOut = 4000; // millis to wait between posts to API
int networkFailures = 0; // log any network failures

boolean rowingStrokesDataUpdated; // has more data been logged by the ISR?
boolean fatalError = false; // did anything go horribly wrong? TODO

void ICACHE_RAM_ATTR rowingStrokesSwitchTriggered() {

  // debounce the input
  if(millis() > lastTriggered + 15){

    pulses++;

    if(pulses >= multiplier){

      // detach the interrupt listener while the interrupt is dealt with
      detachInterrupt(rowingStrokesSwitch); // unregister interrupt while dealing with this interrupt
            
      // append the timestamp to the global variable
      sprintf((char *)rowingStrokesData + strlen((char *)rowingStrokesData), "%s%lu", rowingStrokesData[0] != '\0' ? "," : "", millis());
    
      // set flag that global variable has been updated
      rowingStrokesDataUpdated = true;

      pulses = 0;

      // re-attach the interrupt listener
      attachInterrupt(rowingStrokesSwitch, rowingStrokesSwitchTriggered, FALLING); // re-register interrupt to capture each signal from the rower

    }

    // update debouncing timer
    lastTriggered = millis();

  }
  
}

void postRowingData() {

  // create a data buffer large enough to hold the string which will be posted
  char data[200 + sizeof(apiKey) + sizeof(machineId) + sizeof(damping) + sizeof(baseTime) + sizeof(rowingStrokesData)];

  // build the string to post
  sprintf(data, "key=%s&machineId=%s&damping=%s&multi=%d&base=%s&data=%s", apiKey, machineId, damping, multiplier, baseTime, rowingStrokesData);
  
  // initialise the request
  handleHttpInit(postRowingDataApi);

  Serial.printf("Posting data to API: %s\n", data);

  // post the data to the API
  int httpCode = http.POST(data);

  if(httpCode == HTTP_CODE_OK) {

    Serial.println("Successfully posted data to API");

  }

  // handle any request errors
  handleHttpError(httpCode, false);
  
  // close the connection
  http.end();

}

void handleHttpInit(const char* api) {

  http.begin(api);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.addHeader("Accept", "application/json");
  Serial.println("Initialising connection to API");
  
}

void handleHttpError(int httpCode, boolean isFatal) {

  Serial.println(httpCode);
  
  if(httpCode < 0 || httpCode != HTTP_CODE_OK) {

    if(isFatal){
      fatalError = true;
    } else {
      networkFailures++;
    }
    
    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    
  }
  
}

void setup() {

    Serial.begin(115200); // start serial
    WiFi.mode(WIFI_STA); // start wifi
    WiFiMulti.addAP(wifiAP, wifiSSID); // and add connection config

    attachInterrupt(rowingStrokesSwitch, rowingStrokesSwitchTriggered, FALLING); // register interrupt to capture each signal from the rower

    pinMode(rowingStrokesSwitch, INPUT_PULLUP); // add pullup to interrupt pin
    digitalWrite(rowingStrokesSwitch, HIGH); // and set high

}

void loop() {

    if(fatalError){

      Serial.println("Halted, something went wrong");
      delay(5000);
      
    }

    // wait for WiFi connection
    else if((WiFiMulti.run() == WL_CONNECTED)) {

      // first get the current time from the API
      // this will be used to save the correct time against each recorded stroke
      // so that data will not be affected by network latency
      // and can be posted in batches
      if(strlen(baseTime) == 0){
        
        char data[5 + sizeof(apiKey)]; // create a data buffer large enough to hold the string which will be posted

        sprintf(data, "key=%s", apiKey);

        Serial.println("Getting time from API");
        
        handleHttpInit(getTimeApi);

        int httpCode = http.POST(data);

        if(httpCode > 0 && httpCode == HTTP_CODE_OK) {
          sprintf(baseTime, "%s", http.getString().c_str());
        }
  
        handleHttpError(httpCode, true);
        
        http.end();

      // then check if any rowing data has been logged
      // by the interrupt, and process it
      // but not more than once per n seconds
      } else if(rowingStrokesDataUpdated && millis() > (lastPosted + timeOut)) {

        // get the length of the data string
        byte rowingStrokesDataLength = strlen((const char*)rowingStrokesData);

        // first clear the flag
        rowingStrokesDataUpdated = false;

        // then post the rowing data to the API
        postRowingData();

        // if the interrupt hasn't added any new rowing data while the last set of data was being posted to the API, clear it,
        // otherwise if it has, rowingStrokeDataUpdated will be true again, so leave it to be included in the next POST
        if(!rowingStrokesDataUpdated) {
          
          rowingStrokesData[0] = '\0';
                   
        }

        // reset last posted flag to current time
        lastPosted = millis();
        
      }

    }
    
}

