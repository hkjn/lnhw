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
  0x2f, 0x90, 0xe2, 0x2c, 0x27, 0x77, 0xdc, 0xb2};

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

void response(bool success, const char* data) {
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& reply = jsonBuffer.createObject();
  reply["status"] = success ? "success" : "failure";
  reply["payload"] = data;
  reply.printTo(Serial);
  Serial.println();
}

const char* exp_req_get_hsm_secret = "get_hsm_secret";
const char* exp_req_ping = "ping";

void loop() {
  // put your main code here, to run repeatedly
  if(Serial.available()){
    Serial.readBytesUntil('\n', buf, sizeof(buf));

    //parsing json
    StaticJsonBuffer<1000> jsonBuffer;
    JsonObject &jsonCmd = jsonBuffer.parseObject(buf);
    if (!jsonCmd.success()) {
      response(false, "failed to parse input");
      memset(buf, 0, sizeof(buf));
      return;
    }
    if (jsonCmd.containsKey("request")) {
      const char *request = jsonCmd["request"];
      if (strncmp(request, exp_req_get_hsm_secret, strlen(exp_req_get_hsm_secret) + 1) == 0) {
        bool v = userConfirmed("Pass HSM secret?");
        if (v) {
          char reply[65];
          toHex((const uint8_t*) hsm_secret, 32, reply, 64);
          reply[64] = '\0';
          response(true, reply);
        } else {
          response(false, "user cancelled");
        }
      } else if (strncmp(request, exp_req_ping, strlen(exp_req_ping) + 1) == 0) {
          response(true, "pong");
      } else {
        response(false, "invalid request");
      }
    } else {
      response(false, "missing request field");
    }
    memset(buf, 0, sizeof(buf));
  }
}



