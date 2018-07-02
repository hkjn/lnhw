#include "hsmlib.h"

void hkdf_sha256(uint8_t * output, size_t outputSize, 
            const uint8_t * salt, size_t saltSize, 
            const uint8_t * data, size_t dataSize,
            const char * info, size_t infoSize){

	// first hmac round
	uint8_t raw[32];
	SHA256 sha;
	sha.resetHMAC(salt, saltSize);
	sha.update(data, dataSize);
	sha.finalizeHMAC(salt, saltSize, raw, sizeof(raw));

  uint8_t buf[100];
  memcpy(buf, info, infoSize);
  buf[infoSize] = 1;
	sha.resetHMAC(raw, sizeof(raw));
	sha.update(buf, infoSize+1);
	sha.finalizeHMAC(raw, sizeof(raw), output, outputSize);
}

HDPrivateKey derive_bip32_key(uint8_t * secret, size_t secretSize){
  // deriving seed with HKDF (should be in a function)
  byte bip32_seed[32];

  char key[] = "bip32 seed";
  byte salt = 0;
  hkdf_sha256(bip32_seed, sizeof(bip32_seed),
              &salt, 1, 
              secret, secretSize,
              key, strlen(key));

  // deriving a master key
  HDPrivateKey master_key;
  master_key.fromSeed(bip32_seed, sizeof(bip32_seed), false);

  // deriving bip32 key
  return master_key.child(0).child(0);
}

PrivateKey derive_node_key(uint8_t * secret, size_t secretSize){
  // deriving seed with HKDF (should be in a function)
  byte node_secret[32];

  char key[] = "nodeid";
  byte salt = 0;
  hkdf_sha256(node_secret, sizeof(node_secret),
              &salt, 1, 
              secret, secretSize,
              key, strlen(key));

  return PrivateKey(node_secret, true, USE_TESTNET);
}

void hsm_peer_secret_base(uint8_t * output, size_t outputSize, 
                          uint8_t * secret, size_t secretSize){
  char key[] = "peer seed";
  byte salt = 0;
  hkdf_sha256(output, outputSize,
              &salt, 0, 
              secret, secretSize,
              key, strlen(key));
}

void derive_peer_seed(uint8_t * peer_seed, size_t peer_seed_size,
          uint8_t * peer_seed_base, size_t peer_seed_base_size,
          PublicKey peer_id, uint64_t channel_id){
  char info[] = "per-peer seed";
  uint8_t input[33+6];
  PublicKey peer_copy = peer_id;
  peer_copy.compressed = true;
  peer_copy.sec(input, 33);
  memcpy(input+33, &channel_id, sizeof(channel_id));
  hkdf_sha256(peer_seed, peer_seed_size,
        input, sizeof(input),
        peer_seed_base, peer_seed_base_size,
        info, strlen(info));
}

