#include <Arduino.h>
#include <Servo.h>

Servo myServo;
int servoPin = 9;
// servo config
String x;
String data;
char ch;

void setup()
{
  Serial.begin(9600);
  myServo.attach(servoPin);
  myServo.write(0);
}

void loop()
{
  // checking if we have anything avaiable command to execute
  if (Serial.available() > 0)
  {
    data = Serial.readString();
    ch = data.charAt(0);
    Serial.println(data);
    switch (ch)
    {
    case 'S':
      x = data.substring(1);
      int servopos = x.toInt();
      if (servopos == 1)
        myServo.write(160);
      else if (servopos == 0)
        myServo.write(0);
      break;
    }
  }
}
