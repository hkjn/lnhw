#ifndef __HSMLIB_H__
#define __HSMLIB_H__

#include <Bitcoin.h>
#include <Hash.h>

#define USE_TESTNET true

void hkdf_sha256(uint8_t * output, size_t outputSize, 
            const uint8_t * salt, size_t saltSize, 
            const uint8_t * data, size_t dataSize,
            const char * info, size_t infoSize);

HDPrivateKey derive_bip32_key(uint8_t * secret, size_t secretSize);
PrivateKey derive_node_key(uint8_t * secret, size_t secretSize);
void hsm_peer_secret_base(uint8_t * output, size_t outputSize, 
                          uint8_t * secret, size_t secretSize);
void derive_peer_seed(uint8_t * peer_seed, size_t peer_seed_size,
          uint8_t * peer_seed_base, size_t peer_seed_base_size,
          PublicKey peer_id, uint64_t channel_id);

#endif
