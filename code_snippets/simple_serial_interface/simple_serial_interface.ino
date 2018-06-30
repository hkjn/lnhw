#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_FeatherOLED.h>

Adafruit_FeatherOLED oled = Adafruit_FeatherOLED();

bool stringComplete = false;
String input = " ";

void setup() {
  Serial.begin(9600);
  input.reserve(200);
  oled.init();

  pinMode(5, INPUT_PULLUP);
  pinMode(6, INPUT_PULLUP);
  oled.clearDisplay();
  oled.println("Plz open serial port");
  oled.display();

  while(!Serial){
    ;
  }
  oled.clearDisplay();
  oled.setCursor(0,0);
  oled.println("Connection made");
  oled.display();
}

void loop() {
  // put your main code here, to run repeatedly

  serialEvent();
  if(stringComplete == true){
    stringComplete = false;
    oled.clearDisplay();
    oled.setCursor(0,0);
    oled.println("Would you like to confirm the transaction");
    oled.display();

    bool confirm = digitalRead(5);
    bool not_confirm = digitalRead(6);
    Serial.print(confirm);
    Serial.println(not_confirm);
    while((confirm && not_confirm)){
      confirm = digitalRead(5);
      not_confirm = digitalRead(6);
    }
    oled.clearDisplay();
    oled.setCursor(0,0);
    if(confirm){
      oled.println("Transaction confirmed");
    }else{
      oled.println("Transaction denied");
    }
    oled.display();
  }
}

void serialEvent(){
  while (Serial.available()){
    char incoming_char = Serial.read();
    input += incoming_char;

    if (incoming_char == '\n'){
      stringComplete = true;
    }
  }
}


