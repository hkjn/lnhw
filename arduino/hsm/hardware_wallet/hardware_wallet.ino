// crypto stuff
#include <Bitcoin.h>
#include <Lightning.h>

// screen libs
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_FeatherOLED.h>

Adafruit_FeatherOLED oled = Adafruit_FeatherOLED();

// cleans the display and shows message on the screen
void show(char * msg, bool done=true){
  oled.clearDisplay();
  oled.setCursor(0,0);
  oled.println(msg);
  if(done){
    oled.display();
  }
}

// waits for user to press a button
bool userConfirmed(){
    bool confirm = digitalRead(5);
    bool not_confirm = digitalRead(9);
    // if none of the buttons is pressed
    while((confirm && not_confirm)){
      confirm = digitalRead(5);
      not_confirm = digitalRead(9);
    }
    if(confirm){
      show("Ok, confirmed");
      return true;
    }else{
      show("Cancelled");
      return false;
    }
}

void setup() {
  // setting buttons as inputs
  pinMode(9, INPUT_PULLUP);
  pinMode(6, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
  // screen init
  oled.init();
  oled.setBatteryVisible(false);
  show("Connected");
  // serial connection
  Serial.begin(9600);
  while(!Serial){
    ; // wait for serial port to open
  }
  show("Ready for requests");
}

char buf[3000] = { 0 }; // stores new request
char latest[3000] = { 0 }; // stores latest request
bool v = false; // user confirmation

// if command is unknown - just shows the text and asks
// user for confirmation
void unknownCommand(char * cmd){
  
  // checks if request is the same as before
  // and user already confirmed - just proceed
  // otherwise - ask for user confirmation
  // it is used for example when paying the invoice
  // if previous route failed
  if(memcmp(cmd, latest, strlen(cmd))!=0 || v==false){
    show(cmd);
    v = userConfirmed();
  }
  if(v){
    Serial.print("success: ");
    Serial.println(cmd);
  }else{
    Serial.println("error: user cancelled");
  }
  // stores latest command
  memset(latest, 0, sizeof(latest));
  memcpy(latest, cmd, strlen(cmd));
}

void sign_funding_tx(char * cmd){
  // first we need to convert tx from hex
  byte raw_tx[1000];
  size_t l = fromHex(cmd, strlen(cmd), raw_tx, sizeof(raw_tx));
  if(l == 0){
    show("can't decode tx from hex");
    Serial.println("error: can't decode tx from hex");
    return;
  }
  // then we parse transaction
  Transaction tx;
  l = tx.parse(raw_tx, l);
  if(l == 0){
    show("can't parse tx");
    Serial.println("error: can't parse tx");
    return;
  }
  // now we can show the tx details
  show("Open channel?", false);
  // TODO: show only output with channel addr
  for(int i=0; i< tx.outputsNumber; i++){
    oled.print("output ");
    oled.print(i);
//    oled.print(tx.txOuts[i].address(true)); // testnet addr
    oled.print(": ");
    oled.print(((float)tx.txOuts[i].amount)/100000);
    oled.println(" mBTC");
  }
  oled.display();
  bool ok = userConfirmed();
  if(ok){
    // TODO: sign
    show("ok, signed");
    Serial.print("success: ");
    Serial.println(tx);
  }else{
    show("cancelled");
    Serial.println("error: user cancelled");
  }
}

void parseCommand(char * cmd){
  if(memcmp(cmd, "sign_funding_tx", strlen("sign_funding_tx"))==0){
    sign_funding_tx(cmd + strlen("sign_funding_tx") + 1);
    return;
  }
  unknownCommand(cmd);
}

void loop() {
  // reads serial port
  while(Serial.available()){
    // reads a line to buf
    Serial.readBytesUntil('\n', buf, sizeof(buf));
    // parses the command and does something
    parseCommand(buf);    
    // clear the buffer
    memset(buf, 0, sizeof(buf));
  }
}
