#include <Arduino.h>
#include "mySensor.h"
#include "led_Control.h"

MySensor sensor = MySensor();
MyLed *red = new MyLed();

// pulse low - high read
void echoPinInterrupt()

{
  if (digitalRead(sensor.echo_pin) == HIGH)
  {
    sensor.pulseInTimeBegin = micros();
  }
  else
  {
    // signal falling
    sensor.pulseInTimeEnd = micros();
    sensor.newDistanceAvailable = true;
  }
}

void setup()
{
  Serial.begin(9600);
  red->my_Led_Init();
  // sensor config
  sensor.my_Sensor_Init();
  attachInterrupt(digitalPinToInterrupt(sensor.echo_pin), echoPinInterrupt, CHANGE);
}

void loop()
{
  unsigned long timeNow = millis();
  // every 100 ms start measuring
  sensor.start_Distance_Measurements_With_Interrupt(timeNow);
}
