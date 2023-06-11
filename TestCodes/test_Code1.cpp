#include <Arduino.h>
#include "mySensor.h"
#include "led_Control.h"

// MySensor *sensor = new MySensor();
MyLed *red = new MyLed();
int trig_pin = 7;
int echo_pin = 6;
// read every 100 millisecond
unsigned long lastTimeUltrasonicTrigger = millis();
unsigned long ultrasonicTriggerDelay = 100;

void trigger_UltrasonicSensor()
{
    digitalWrite(trig_pin, 0); // low -> to ->high first setting to low signal then to high just to be sure
    delayMicroseconds(2);
    digitalWrite(trig_pin, 1);
    delayMicroseconds(10);
    digitalWrite(trig_pin, 0);
}

double getUltrasonicDistance()
{
    double duration = pulseIn(echo_pin, 1); // directly cast it to double
    double distance = duration / 58.0;      // formula to get the distance in cm
    return distance;
}

void setup()
{
    Serial.begin(9600);
    red->my_Led_Init();
    pinMode(trig_pin, OUTPUT);
    pinMode(echo_pin, INPUT);
}

void loop()
{
    unsigned long timeNow = millis();
    if (timeNow - lastTimeUltrasonicTrigger > ultrasonicTriggerDelay)
    {
        lastTimeUltrasonicTrigger += ultrasonicTriggerDelay;
        // trigger sensor
        trigger_UltrasonicSensor();
        // read pulse
        Serial.println(getUltrasonicDistance());
    }
}
