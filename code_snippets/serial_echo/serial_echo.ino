char buf[1000];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available()) {
    Serial.readBytesUntil('\n', buf, sizeof(buf));
    if(memcmp(buf, "ping", 4) == 0){
      Serial.println("pong");
    }else{
      delay(1000);
      Serial.println(buf);
    }
    memset(buf, 0, sizeof(buf));
  }
}
