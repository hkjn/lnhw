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
  
  // loading hsm_secret. 
  // hardcoded for now, should be loaded from SD card or internal memory
  // also shows some handy hex-to-bytes and back conversions
  char hsm_hex[] = "1e14cd384691a92120f6702742ca0e06951aeee57e91b5e137526c0a6c0867f4";
  fromHex(hsm_hex, hsm_secret, sizeof(hsm_secret));
  Serial.println("HSM secret (should never leave the device):");
  Serial.println(toHex(hsm_secret, sizeof(hsm_secret)));
}

char buf[1000];

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    Serial.readBytesUntil('\n', buf, sizeof(buf));

    StaticJsonBuffer<1000> jsonBuffer;
    JsonObject &jsonCmd = jsonBuffer.parseObject(buf);

    if (!jsonCmd.success()) {
      Serial.println("invalid JSON:");
      Serial.println(buf);
      memset(buf, 0, sizeof(buf));
      return;
    }
    if (jsonCmd.containsKey("cmd")) {
      const char *cmd = jsonCmd["cmd"];
      if (strncmp(cmd, "echo", strlen("echo")) == 0) {
        const char *msg = jsonCmd["msg"];
        Serial.println(msg);
      } else if (strncmp(cmd, "get_secret", strlen("get_secret")) == 0) {
        char reply[65];
        toHex((const uint8_t*) hsm_secret, 32, reply, 64);
        Serial.println(reply);
      } else {
        Serial.println("cmd unknown\n");
      }
    } else {
      Serial.println("No cmd received\n");
    }
    memset(buf, 0, sizeof(buf));
  }
}
