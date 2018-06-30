void setup() {
  // put your setup code here, to run once:
  pinMode(5, INPUT_PULLUP);
  pinMode(6, INPUT_PULLUP);
  Serial.begin(9600);

  while(!Serial){
    ; // wait for serial port to open
  }

}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()){
    char buf[1000];
    Serial.readBytesUntil('\n', buf, sizeof(buf));
    Serial.println("Please press the button B or C");
//    oled.println("Confirm?");
    bool confirmed = !digitalRead(6);
    bool unconfirmed = !digitalRead(5);
    while(!(confirmed || unconfirmed)){
      confirmed = !digitalRead(6);
      unconfirmed = !digitalRead(5);
    }
    Serial.println("Button pressed");
    if(confirmed){
      Serial.println("Accepted");
    }else{
      Serial.println("Not accepted");
    }
  }
}
