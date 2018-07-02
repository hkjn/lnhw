#include <Bitcoin.h>

void setup() {
  Serial.begin(9600);
  while(!Serial){
    ; // wait to open
  }
  PublicKey pubkey("03a955c05e5120f265832a64c3c9e27ab5100f75043c1872113da90ba7b61f707a");
  Serial.println(pubkey);
  Signature sig("30440220417919a16b0b51a9a7c7d3f9e00a0c436d6a51f6e305c913c734fcc7da7c400e02205d19d9350da9a09b5ebdaeb848412673480ac8e94ba2d5be2e2a64976b22c7b2");
  Serial.println(sig);
  Transaction tx;
  byte arr[200] = { 0 };
  size_t len = fromHex("020000000001010b7ba480574f42c676614f7eff4450b0660059b1a5cf5980cd4af86e7c99dd870100000000ffffffff0240420f000000000022002028886250e2aa36ca8d5b6fc05b7910e7bb810160eb75b5849bcc103bd6b3880fcc826f060000000016001493fcabe4db90943ebf20b2d1746f8a21b161ede9024730440220417919a16b0b51a9a7c7d3f9e00a0c436d6a51f6e305c913c734fcc7da7c400e02205d19d9350da9a09b5ebdaeb848412673480ac8e94ba2d5be2e2a64976b22c7b2012103a955c05e5120f265832a64c3c9e27ab5100f75043c1872113da90ba7b61f707a00000000", arr, sizeof(arr));
  size_t parsed = tx.parse(arr, len);
  Serial.println(parsed);
  Serial.println(tx.inputsNumber);
}

void loop() {
  // put your main code here, to run repeatedly:

}
