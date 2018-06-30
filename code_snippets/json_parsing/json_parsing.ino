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

  // deriving seed with HKDF (should be in a function)
  byte bip32_seed[32];

  // first hmac round
  byte raw[32];
  SHA256 sha;
  byte salt[] = { 0 };
  sha.resetHMAC(salt, sizeof(salt));
  sha.update(hsm_secret, sizeof(hsm_secret));
  sha.finalizeHMAC(salt, sizeof(salt), raw, sizeof(raw));

  char key[] = "bip32 seed\x01";
  sha.resetHMAC(raw, sizeof(raw));
  sha.update(key, strlen(key));
  sha.finalizeHMAC(raw, sizeof(raw), bip32_seed, sizeof(bip32_seed));

  Serial.println("\nHSM bip32 seed:");
  Serial.println(toHex(bip32_seed, 32));

  // deriving a master key
  HDPrivateKey master_key;
  master_key.fromSeed(bip32_seed, sizeof(bip32_seed), false);
  Serial.println("\nMaster key:");
  Serial.println(master_key);

  // deriving bip32 key
  HDPrivateKey bip32_key = master_key.child(0).child(0);
  Serial.println("\nbip32 key:");
  Serial.println(bip32_key);

  // char json[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";
  char json[] = "{\"cmd\":\"echo\",\"msg\":\"test\"}";

  StaticJsonBuffer<200> jsonBuffer;

  JsonObject &root = jsonBuffer.parseObject(json);

  const char *sensor = root["cmd"];
  // long time = root["time"];
  // double latitude = root["data"][0];
  // double longitude = root["data"][1];
  Serial.println(sensor);
  Serial.println((const char*) root["msg"]);
}

char buf[1000];

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    delay(1000);
    Serial.println("1\n");
    Serial.readBytesUntil('\n', buf, sizeof(buf));

    Serial.println("2\n");
    Serial.println(buf);
    StaticJsonBuffer<1000> jsonBuffer;
    JsonObject &jsonCmd = jsonBuffer.parseObject(buf);

    Serial.println("3\n");
    memset(buf, 0, sizeof(buf));

    if (jsonCmd.success()) {
      Serial.println("parsed successfully");
    } else {
      Serial.println("parsing failed");
      return;
    }
    Serial.print(jsonCmd);
    if (jsonCmd.containsKey("cmd")) {
      Serial.print("cmd found: ");
      const char *cmd = jsonCmd["cmd"];
      Serial.println(cmd);
      if (strncmp(cmd, "echo", strlen("echo")) == 0) {
        Serial.println("4\n");
        const char *msg = jsonCmd["msg"];
        delay(1000);
        Serial.println(msg);
      } else if (strncmp(cmd, "get_secret", strlen("get_secret")) == 0) {
        Serial.println("5\n");
        char reply[64];
        toHex((const uint8_t*) hsm_secret, 32, reply, 64);
        Serial.println(reply);
      } else {
        Serial.println("6\n");
        Serial.println("Cmd unknown\n");
      }
    }
    Serial.println("No cmd received\n");
  }
}
