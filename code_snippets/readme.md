# Code snippets / small programms

Here we can store small working or somehow working pieces of code that can be used as debugging / testing tools for our project.

Currently available mini-programs:

- [serial.c](serial.c) - a simple C program that sends a command line argument to the serial port
- [bip32_key_derivation.ino](bip32_key_derivation/bip32_key_derivation.ino) - an Arduino sketch that derives the bip32 key from hsm_secret as described in the [docs](../doc/hsmd/readme.md#populate_secretstuff)

More small snippets that may be useful:

## `sprintHex(arr, len, buf, buflen)`

Converts array of certain `len` to a hex string and writes it to `buf`.

```c
static void sprintHex(u8 * arr, size_t len, char * buf, size_t buflen){
	for(int i=0; i<len; i++){
		buf += sprintf(buf, "%02x", arr[i]);
	}
}
```