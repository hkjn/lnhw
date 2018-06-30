#ifndef __HSM_H__
#define __HSM_H__

#include <Bitcoin.h>
#include <Hash.h>

#define USE_TESTNET true

void hkdf_sha256(uint8_t * output, size_t outputSize, 
            const uint8_t * salt, size_t saltSize, 
            const uint8_t * data, size_t dataSize,
            const char * info, size_t infoSize);

#endif
