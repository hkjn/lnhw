#include <Bitcoin.h>
#include <Hash.h>
#include <ArduinoJson.h>

#define USE_TESTNET true

// global scope
byte hsm_secret[32];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  while(!Serial){
    ; // wait for serial port to open
  }
  while (!Serial.available()) {
    ;
  }
  Serial.flush();
  
  // loading hsm_secret. 
  // hardcoded for now, should be loaded from SD card or internal memory
  // also shows some handy hex-to-bytes and back conversions
  char hsm_hex[] = "1e14cd384691a92120f6702742ca0e06951aeee57e91b5e137526c0a6c0867f4";
  fromHex(hsm_hex, hsm_secret, sizeof(hsm_secret));
  Serial.println("HSM secret (should never leave the device):");
  Serial.println(toHex(hsm_secret, sizeof(hsm_secret)));
}

char buf[1000];

const char request_key[] = "request";
const char request_echo[] = "echo";
const char request_get_hsm_secret[] = "get_hsm_secret";

void response(bool success, const char* data) {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& reply = jsonBuffer.createObject();
  reply["success"] = success ? "success" : "failure";
  reply["payload"] = data;
  reply.printTo(Serial);
  Serial.println();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    Serial.readBytesUntil('\n', buf, sizeof(buf));

    StaticJsonBuffer<1000> jsonBuffer;
    JsonObject &jsonCmd = jsonBuffer.parseObject(buf);

    if (!jsonCmd.success()) {
      response(false, "invalid input");
      memset(buf, 0, sizeof(buf));
      return;
    }
    if (jsonCmd.containsKey(request_key)) {
      const char *cmd = jsonCmd[request_key];
      if (strncmp(cmd, request_echo, strlen(request_echo)) == 0) {
        const char *msg = jsonCmd["msg"];
        response(true, msg);
      } else if (strncmp(cmd, request_get_hsm_secret, strlen(request_get_hsm_secret)) == 0) {
        char reply[65];
        toHex((const uint8_t*) hsm_secret, 32, reply, 64);
        reply[64] = '\0';
        response(true, reply);
      } else {
        response(false, "request unknown");
      }
    } else {
      response(false, "no request received");
    }
    memset(buf, 0, sizeof(buf));
  }
}
