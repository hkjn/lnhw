#include "hsm.h"

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

  char key[] = "bip32 seed";
  byte salt = 0;
  hkdf_sha256(bip32_seed, sizeof(bip32_seed),
              &salt, 1, 
              hsm_secret, sizeof(hsm_secret),
              key, 10);

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
}

void loop() {
  // put your main code here, to run repeatedly:

}
