#include <Arduino.h>

class MyLed
{

public:
    int led_Pin = 13;
    MyLed(/* args */){};
    MyLed(int ledPinRed)
    {
        this->led_Pin = led_Pin;
    }
    // initialize the led
    void my_Led_Init() { pinMode(this->led_Pin, OUTPUT); }

    // led blink
    void blink_Led(int delaysec)
    {
        digitalWrite(led_Pin, HIGH);
        delay(delaysec);
        digitalWrite(led_Pin, LOW);
        delay(delaysec);
    }

    // switch on the led
    void switch_On() { digitalWrite(led_Pin, 1); }

    // switch off the led
    void switch_Off() { digitalWrite(led_Pin, 0); }

    void state_Led(int state) { digitalWrite(led_Pin, state); }

    ~MyLed(){};
};
