#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_FeatherOLED.h>
#include <ArduinoJson.h>
#include <Bitcoin.h>

Adafruit_FeatherOLED oled = Adafruit_FeatherOLED();

char buf[1000];
byte hsm_secret[] = {
  0x04, 0xf2, 0xad, 0x50, 0xa5, 0xe3, 0xaa, 0x24, 
  0xe1, 0x66, 0xbd, 0x01, 0x48, 0x8c, 0xd8, 0x59, 
  0x56, 0x74, 0x79, 0xda, 0x0c, 0x13, 0x16, 0x70, 
  0x2f, 0x90, 0xe2, 0x2c, 0x27, 0x77, 0xdc, 0xb2
};

void setup() {
  Serial.begin(9600);
  oled.init();

  pinMode(5, INPUT_PULLUP);
  pinMode(6, INPUT_PULLUP);
  oled.clearDisplay();
  oled.println("Serial port is closed");
  oled.display();

  while(!Serial){
    ;
  }
  oled.clearDisplay();
  oled.setCursor(0,0);
  oled.println("Connected");
  oled.println("Ready for requests");
  oled.display();
}

bool userConfirmed(char * text){
    oled.clearDisplay();
    oled.setCursor(0,0);
    oled.println(text);
    oled.println("B = yes");
    oled.println("C = no");
    oled.display();

    bool confirm = digitalRead(5);
    bool not_confirm = digitalRead(6);
    while((confirm && not_confirm)){
      confirm = digitalRead(5);
      not_confirm = digitalRead(6);
    }
    oled.clearDisplay();
    oled.setCursor(0,0);
    if(confirm){
      oled.println("Ok, confirmed");
      oled.display();
      return true;
    }else{
      oled.println("Cancelled");
      oled.display();
      return false;
    }
}

void loop() {
  // put your main code here, to run repeatedly
  if(Serial.available()){
    Serial.readBytesUntil('\n', buf, sizeof(buf));

    //parsing json
    StaticJsonBuffer<1000> jsonBuffer;
    JsonObject &jsonCmd = jsonBuffer.parseObject(buf);
    if (!jsonCmd.success()) {
      Serial.println("{  \"status\": \"failure\", \"payload\": \"can't parse json\" }");
      memset(buf, 0, sizeof(buf));
      return;
    }
    if (jsonCmd.containsKey("request")) {
      const char *request = jsonCmd["request"];
      if (strncmp(request, "get_hsm_secret", strlen("get_hsm_secret")) == 0) {
        bool v = userConfirmed("Pass HSM secret?");
        if(v){
          Serial.print("{  \"status\": \"success\",  \"payload\": \"");
          toHex(hsm_secret, 32, Serial);
          Serial.println("\" }");
        }else{
          Serial.println("{  \"status\": \"failure\", \"payload\": \"user cancelled\"  }");
        }
      } else {
        Serial.println("{  \"status\": \"failure\", \"payload\": \"invalid request\"  }");
      }
    } else {
      Serial.println("{  \"status\": \"failure\", \"payload\": \"missing request field\"  }");
    }
    memset(buf, 0, sizeof(buf));
  }
}



