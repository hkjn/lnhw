#include "hsm.h"

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

