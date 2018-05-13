////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INCLUDES AND GLOBAL VARS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WebSocketClient.h>
#include "secret.h" // personal connection data stored seperately to exclude from version control

ESP8266WiFiMulti WiFiMulti;
WiFiClient client;
HTTPClient http;
WebSocketClient webSocketClient;

const char* wifiAP = WIFIAP; // WIFI Access Point name
const char* wifiSSID = WIFISSID; // WIFI SSID password
const char* postRowingDataSocket = SOCKETIP; // socket for logging rowing data
const char* email = APPUSEREMAIL;
const char* password = APPPASSWORD;

const char machineId[] = "water_rower_a1"; // the type of rower
const char damping[] = "2000"; // ml - however full your water tank is

char baseTime[14]; // the base time, which will be obtained from the API as millis from epoch
char jwt[200]; // the jwt which will be obtained from api

volatile long lastTriggered = 0; //the last time the interrupt pin was triggered

unsigned long lastPosted = millis(); // reference point for time elapsed since last post to API
unsigned long dataArray[20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}; // array for holding rower pulse time values

const int timeOut = 4000; // millis to wait between posts to API

const byte rowingStrokesSwitch = 4; // DPIO connected to rower, triggers interrupt function
const byte debounce = 30;
const byte dataArrayLength = 20;
const byte multiplier = 10;

byte currentDataArrayIndex = 0;
byte pulses = 0;

boolean rowingStrokesDataUpdated; // has more data been logged by the ISR?



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INTERRUPT HANDLER
// called by sensor on rower
// adds current system time to array
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void ICACHE_RAM_ATTR rowingStrokesSwitchTriggered() {

  // debounce the input
  if (millis() > lastTriggered + debounce) {

    pulses++;

    // only record every nth pulse from the rower
    // every pulse is needlessly granular
    // and creates large data files
    if (pulses >= multiplier) {

      detachInterrupt(rowingStrokesSwitch); // detach interrupt handler while dealing with interrupt

      if (currentDataArrayIndex + 1 < dataArrayLength) { // if the data array isn't full
        dataArray[currentDataArrayIndex] = millis(); // record current time
        currentDataArrayIndex++; // and update the array index for the next call
      } else {
        Serial.print("Strokes missed"); // alert if a pulse log was attempted but the array was full
      }

      // set flags that global variable has been updated
      rowingStrokesDataUpdated = true;
      pulses = 0;

      // re-attach the interrupt listener
      attachInterrupt(rowingStrokesSwitch, rowingStrokesSwitchTriggered, FALLING); // re-register interrupt to capture each signal from the rower

    }

    // update debouncing timer
    lastTriggered = millis();

  }

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SEND ROWING DATA TO SERVER
// builds a json object
// and sends it to websocket
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void sendRowingData() {

  Serial.print("Sending data to API: ");

  StaticJsonBuffer<300> jsonBuffer;
  JsonObject& rowingDataJsonObj = jsonBuffer.createObject();
  JsonArray& data = rowingDataJsonObj.createNestedArray("data");

  char jsonBuffer1[300]; // create a data buffer large enough to hold the string which will be posted

  rowingDataJsonObj["machineId"] = machineId;
  rowingDataJsonObj["damping"] = damping;
  rowingDataJsonObj["multi"] = multiplier;
  rowingDataJsonObj["base"] = baseTime;

  detachInterrupt(rowingStrokesSwitch);

  for (int i = 0; i < dataArrayLength; i++) {
    if (dataArray[i] > 0) {
      Serial.print(dataArray[i]);
      Serial.print(" ");
      data.add(dataArray[i]);
    }
    dataArray[i] = 0;
  }

  attachInterrupt(rowingStrokesSwitch, rowingStrokesSwitchTriggered, FALLING);

  Serial.println("");

  rowingDataJsonObj.printTo(jsonBuffer1);
  webSocketClient.sendData(jsonBuffer1);

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HALT ON NETWORK ERRORS
// todo - retry conncetions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void halt(const char* message) {

  while (true) {
    Serial.println(message);
    delay(1000);
  }

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AUTHENTICATE WITH THE SERVER
// sends email and password
// and gets JWT for authenticating on websocket
// and current server timestamp
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void authenticate() {

  char loginData[60]; // create a data buffer large enough to hold the string which will be posted
  StaticJsonBuffer<300> jsonBuffer;

  sprintf(loginData, "email=%s&password=%s", email, password);

  Serial.println("Getting JWT and timestamp from API");

  http.begin("http://192.168.1.64:8080/api/login");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.addHeader("Accept", "application/json");

  int httpCode = http.POST(loginData);

  if (httpCode > 0 && httpCode == HTTP_CODE_OK) {

    Serial.println(http.getString());
    JsonObject& jsonData = jsonBuffer.parseObject(http.getString()); // parse the JSON message

    if (!jsonData.success()) { // if parsing the JSON failed

      Serial.println("parseObject() failed");

    } else { // otherwise handle it

      if (jsonData["timestamp"]) { // set the base time
        const char* timeStamp = jsonData["timestamp"]; // get the base time
        sprintf(baseTime, "%s", timeStamp); // and assign to the global variable
      }
      
    }

  } else if (httpCode < 0 || httpCode != HTTP_CODE_OK) {

    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());

  }

  http.end();

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETUP
// connect to internet, then server websocket
// initialise IO pins
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void setup() {

  Serial.begin(115200); // start serial
  WiFi.begin(wifiAP, wifiSSID); // start WIFI

  // wait for WIFI to connect
  while (WiFi.status() != WL_CONNECTED) {
    delay(50); // delay required between checks or client will crash
  }

  // once WIFI connected
  if (WiFi.status() == WL_CONNECTED) {

    authenticate(); // first authenticate

    // then connect to websocket
    if (client.connect(postRowingDataSocket, 8080)) {
      Serial.println("Connected to websocket endpoint. Attempting upgrade handshake...");
    } else {
      halt("Connection failed");
    }

    // then set options for websocket upgrade handshake
    webSocketClient.path = "/api";
    webSocketClient.host = (char*)postRowingDataSocket;

    // then upgrade connection to websocket
    if (webSocketClient.handshake(client)) {
      Serial.println("Websocket handshake successful");
    } else {
      halt("Websocket handshake failed");
    }

    attachInterrupt(rowingStrokesSwitch, rowingStrokesSwitchTriggered, FALLING); // register interrupt to capture each signal from the rower
    pinMode(rowingStrokesSwitch, INPUT_PULLUP); // add pullup to interrupt pin
    digitalWrite(rowingStrokesSwitch, HIGH); // and set high

  } else {

    Serial.print("Error connecting");

  }

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAIN LOOP
// posts rowing data to server
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void loop() {

  String data; // todo, get rid of this String

  webSocketClient.getData(data); // check for any messages from the server

  if (data.length() > 0) { // if a message exists, read it

    StaticJsonBuffer<300> jsonBuffer;
    JsonObject& jsonData = jsonBuffer.parseObject(data); // parse the JSON message

    if (!jsonData.success()) { // if parsing the JSON failed

      Serial.println("parseObject() failed");

    } else { // otherwise handle it

      if (jsonData["message"]) {
        const char* message = jsonData["message"];
        Serial.println("Message: ");
        Serial.print(message);
      } else if (jsonData["error"]) {
        const char* error = jsonData["error"];
        Serial.println("Error: ");
        Serial.print(error);
      }

      Serial.println("");

    }

  }

  // if base time has been obtained, there is new logged rowing data and minimum time since last message send has elapsed
  if (strlen(baseTime) > 0 && rowingStrokesDataUpdated && millis() > (lastPosted + timeOut)) {

    sendRowingData(); // send the rowing data to the API
    rowingStrokesDataUpdated = false; // reset flag
    currentDataArrayIndex = 0;  // reset index
    lastPosted = millis(); // reset flag

  }

}
