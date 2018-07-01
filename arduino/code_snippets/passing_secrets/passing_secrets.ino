#include "hsm.h"

// global scope, hardcoded for demo
byte hsm_secret[] = { 
  0x1e, 0x14, 0xcd, 0x38, 0x46, 0x91, 0xa9, 0x21, 
  0x20, 0xf6, 0x70, 0x27, 0x42, 0xca, 0x0e, 0x06, 
  0x95, 0x1a, 0xee, 0xe5, 0x7e, 0x91, 0xb5, 0xe1, 
  0x37, 0x52, 0x6c, 0x0a, 0x6c, 0x08, 0x67, 0xf4
};

HDPrivateKey bip32_key;
PrivateKey node_key;
byte peer_seed_base[32];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  while(!Serial){
    ; // wait for serial port to open
  }
  toHex(hsm_secret, sizeof(hsm_secret), Serial);
  Serial.println();

  // similar to populate_secretstuff in hsm.c
  bip32_key = derive_bip32_key(hsm_secret, sizeof(hsm_secret));
  Serial.println(bip32_key);

  // similar to node_key in hsm.c
  node_key = derive_node_key(hsm_secret, sizeof(hsm_secret));
  Serial.println(node_key);

  // TODO: test that it actually derives what it suppose to derive
  hsm_peer_secret_base(peer_seed_base, sizeof(peer_seed_base), 
                      hsm_secret, sizeof(hsm_secret));
  toHex(peer_seed_base, sizeof(peer_seed_base), Serial);
  Serial.println();

  // QUESTION: do we need just give the peer_seed_base to the host?

  // this code does the same as bitcoin_keypair function in hsm.c
  uint64_t index = 123;
  HDPrivateKey hd = bip32_key.child(index);
  PrivateKey privkey = hd.privateKey;
  PublicKey pubkey = privkey.publicKey();

  // TODO: should be tested
  byte peer_seed[32];
  // some random point
  PublicKey peer_id("0290818bfe8ddc026b0a6466bf4cbd38db93e370a6453b96a6e5adfd5fb3bf2373");
  uint64_t channel_id = 2368;
  derive_peer_seed(peer_seed, sizeof(peer_seed),
          peer_seed_base, sizeof(peer_seed_base),
          peer_id, channel_id);

  // need more functions
  // derive_basepoints (in hsm_unilateral_close_privkey)
  // 
}

void loop() {
  // put your main code here, to run repeatedly:
}
