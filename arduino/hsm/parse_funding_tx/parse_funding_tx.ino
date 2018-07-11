#include <Bitcoin.h>

// lightning transaction
char hex[] = "0200000000010118368c4544a4b36694f8da9fdcbf82afe8bcfc6a887c9e82ca0c772ffcdd854c01000000171600143a71fb69c93e3159021470b591487bb18492949fffffffff0240420f000000000022002029c9c94a2d5e9a1a4ea61dd2555711413e0119aee26721a7a0680b1abbbd9d058f53890000000000160014a47ffbf007f62369ca593e2089431d3dc9f2176002483045022100834209758f43f82956fe194e2d6575cd47849f2166d3b951caf001e05abc3c0702206bb143fb195cc7fd39c07d327cea3ec54d911bb78433b5d3d88403d283ee685601210329b05bef6e13529fae67827b61a718afa41fd42a669b87b46af767ed20305dcf00000000";
byte raw[500];

void setup() {
  Serial.begin(9600);
  while(!Serial){
    ;
  }

  size_t len = fromHex(hex, raw, sizeof(raw));
  Serial.println(toHex(raw, len));
  Serial.print("Raw length: ");
  Serial.println(len);
  
  Transaction tx;
  size_t cur = tx.parse(raw, len);
  Serial.print("Tx length: ");
  Serial.println(cur);

  Serial.print("Version: ");
  Serial.println(tx.version);
  Serial.print("Inputs:  ");
  Serial.println(tx.inputsNumber);
  for(int i=0; i< tx.inputsNumber; i++){
    Serial.print("\tHash:          ");
    Serial.println(toHex(tx.txIns[i].hash, 32));
    Serial.print("\tOutput index:  ");
    Serial.println(tx.txIns[i].outputIndex);

    Script sc = tx.txIns[i].scriptSig;
    Serial.print("\tScript length: ");
    Serial.println(sc.scriptLength());
    Serial.print("\tScript:        ");
    Serial.println(sc);
    Serial.print("\tSequence:      ");
    Serial.println(tx.txIns[i].sequence);
    if(tx.txIns[i].isSegwit()){
      Script witness = tx.txIns[i].witnessProgram;
      Serial.print("\tWitness program:");
      Serial.println(witness);
    }
  }
  Serial.print("Outputs: ");
  Serial.println(tx.outputsNumber);

  for(int i=0; i< tx.outputsNumber; i++){
    Serial.print("\t");
    Serial.print(tx.txOuts[i].address(true));
    Serial.print(": ");
    Serial.print(((float)tx.txOuts[i].amount)/100000);
    Serial.println(" mBTC");
  }

  Serial.print("Transaction id:");
  Serial.println(tx.id());
  Serial.println("Raw transaction:");
  Serial.println(tx);

  byte h[32];
  tx.hash(h);
  Serial.print("Hash: ");
  Serial.println(toHex(h, sizeof(h)));

  Serial.println("Done!");
}

void loop() {
  // put your main code here, to run repeatedly:

}
