#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WebSocketsClient.h>
#include <Hash.h>
#include "secret.h" // personal connection data stored seperately to exclude from version control

HTTPClient http;
ESP8266WiFiMulti WiFiMulti;
WebSocketsClient webSocket;

const char* wifiAP = WIFIAP; // WIFI Access Point name
const char* wifiSSID = WIFISSID; // WIFI SSID password
const char* postRowingDataSocket = SOCKETIP; // socket for logging rowing data
const char* email = APPUSEREMAIL;
const char* password = APPPASSWORD;

char baseTime[14]; // the base time, which will be obtained from the API as millis from epoch
char jwt[200]; // the jwt which will be obtained from api

volatile long lastTriggered = 0; //the last time the interrupt pin was triggered

unsigned long lastPosted = millis(); // reference point for time elapsed since last post to API
unsigned long dataArray[20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}; // array for holding rower pulse time values

const int timeOut = 3000; // millis to wait between posts to API

const byte rowingStrokesSwitch = 4; // DPIO connected to rower, triggers interrupt function
const byte debounce = 30;
const byte dataArrayLength = 20;
const byte multiplier = 10;

byte currentDataArrayIndex = 0;
byte pulses = 0;

boolean rowingStrokesDataUpdated; // has more data been logged by the ISR?



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WEBSOCKET EVENT HANDLER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {

  StaticJsonBuffer<300> jsonBuffer;
  JsonObject& rowingDataJsonObj = jsonBuffer.createObject();
  char jsonBuffer1[300]; // create a data buffer large enough to hold the string which will be posted

  switch (type) {

    case WStype_DISCONNECTED:

      Serial.printf("[WSc] Disconnected!\n");

      break;

    case WStype_CONNECTED:

      Serial.printf("[WSc] Connected to url: %s\n",  payload);

      rowingDataJsonObj["error"] = false;
      rowingDataJsonObj["type"] = "auth";
      rowingDataJsonObj["payload"] = jwt;

      rowingDataJsonObj.printTo(jsonBuffer1);

      webSocket.sendTXT(jsonBuffer1); // send the JWT to authenticate

      break;

    case WStype_TEXT:

      Serial.printf("[WSc] get text: %s\n", payload);

      break;

    case WStype_BIN:

      Serial.printf("[WSc] get binary length: %u\n", length);
      hexdump(payload, length);

      break;

  }

}



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
  JsonObject& payload = rowingDataJsonObj.createNestedObject("payload");
  JsonArray& data = payload.createNestedArray("data");

  char jsonBuffer1[300]; // create a data buffer large enough to hold the string which will be posted

  rowingDataJsonObj["type"] = "WEBSOCKET:MESSAGE";
  rowingDataJsonObj["error"] = false;
  payload["base"] = baseTime;

  detachInterrupt(rowingStrokesSwitch);

  for (int i = 0; i < dataArrayLength; i++) {

    if (dataArray[i] > 0) {
      data.add(dataArray[i]);
    }

    dataArray[i] = 0;

  }

  attachInterrupt(rowingStrokesSwitch, rowingStrokesSwitchTriggered, FALLING);

  rowingDataJsonObj.printTo(jsonBuffer1);
  webSocket.sendTXT(jsonBuffer1);

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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// AUTHENTICATE WITH THE SERVER
//// sends email and password
//// and gets JWT for authenticating on websocket
//// and current server timestamp
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void connectToServer() {

  char loginData[100]; // create a data buffer large enough to hold the string which will be posted
  StaticJsonBuffer<300> jsonBuffer;

  sprintf(loginData, "email=%s&password=%s&isLogger=true", email, password);

  Serial.println("Getting JWT and timestamp from API");

  http.begin("http://192.168.1.64:8080/api/login");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  http.addHeader("Accept", "application/json");

  int httpCode = http.POST(loginData);

  if (httpCode > 0 && httpCode == HTTP_CODE_OK) {

    String response = http.getString();

    JsonObject& jsonData = jsonBuffer.parseObject(response); // parse the JSON message

    if (!jsonData.success()) { // if parsing the JSON failed

      Serial.println("parseObject() failed");

    } else { // otherwise handle it

      const char* token = jsonData["token"]; // get the base time
      const char* timeStamp = jsonData["timestamp"]; // get the base time

      sprintf(jwt, "%s", token); // and assign to the global variable
      sprintf(baseTime, "%s", timeStamp); // and assign to the global variable

      webSocket.beginSSL("192.168.1.64", 443);
      webSocket.onEvent(webSocketEvent);

    }

  } else if (httpCode < 0 || httpCode != HTTP_CODE_OK) {

    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());

  }

  http.end();

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SETUP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void setup() {

  Serial.begin(115200);

  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFiMulti.addAP("PLUSNET-98HF", "a769b594ad");

  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }

  connectToServer();

  attachInterrupt(rowingStrokesSwitch, rowingStrokesSwitchTriggered, FALLING); // register interrupt to capture each signal from the rower
  pinMode(rowingStrokesSwitch, INPUT_PULLUP); // add pullup to interrupt pin
  digitalWrite(rowingStrokesSwitch, HIGH); // and set high

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOOP
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void loop() {

  webSocket.loop();

  if (strlen(baseTime) > 0 && rowingStrokesDataUpdated && millis() > (lastPosted + timeOut)) {

    sendRowingData(); // send the rowing data to the API
    rowingStrokesDataUpdated = false; // reset flag
    currentDataArrayIndex = 0;  // reset index
    lastPosted = millis(); // reset flag

  }

}
