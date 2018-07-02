#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_FeatherOLED.h>

Adafruit_FeatherOLED oled = Adafruit_FeatherOLED();

void show(char * msg){
  oled.clearDisplay();
  oled.setCursor(0,0);
  oled.println(msg);
  oled.display();
}

bool userConfirmed(){
    bool confirm = digitalRead(5);
    bool not_confirm = digitalRead(9);
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
  // put your setup code here, to run once:
  pinMode(9, INPUT_PULLUP);
  pinMode(6, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
  Serial.begin(9600);
  oled.init();
  oled.setBatteryVisible(false);
  show("Connected");
  while(!Serial){
    ;
  }
  show("Ready for requests");
}

char buf[3000] = { 0 };
char latest[3000] = { 0 };
bool v = false;

// TODO: timeout
void loop() {
  // put your main code here, to run repeatedly:
  while(Serial.available()){
    Serial.readBytesUntil('\n', buf, sizeof(buf));
    if(memcmp(buf, latest, sizeof(buf))!=0 || v==false){
      show(buf);
      v = userConfirmed();
    }
    if(v){
      Serial.print("success: ");
      Serial.println(buf);
    }else{
      Serial.println("error: user cancelled");
    }
    memcpy(latest,buf, sizeof(buf));
    memset(buf, 0, sizeof(buf));
  }
}
