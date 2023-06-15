#include <Arduino.h>

class MySensor
{
public:
    // default pin configuration
    int trig_pin = 7;
    int echo_pin = 18; // also to handle interrupt
    // default timer config
    unsigned long lastTimeUltrasonicTrigger = millis();
    unsigned long ultrasonicTriggerDelay = 60;

    // with pulse interrupt
    volatile unsigned long pulseInTimeBegin;
    volatile unsigned long pulseInTimeEnd;
    volatile bool newDistanceAvailable = false;

    // default distance
    double previous_Distance = 400;
    // default constructor
    MySensor() {}
    MySensor(int trig, int echo)
    {
        this->echo_pin = echo;
        this->trig_pin = trig;
    }

    // initialize the sensors
    void my_Sensor_Init()
    {
        pinMode(this->trig_pin, OUTPUT);
        pinMode(this->echo_pin, INPUT);
    }

    // trig ultrasonic sensor to get the data
    void trigger_UltrasonicSensor()
    {
        digitalWrite(trig_pin, 0); // low -> to ->high first setting to low signal then to high just to be sure
        delayMicroseconds(2);
        digitalWrite(trig_pin, 1);
        delayMicroseconds(10);
        digitalWrite(trig_pin, 0);
    }
    // return the distance in cm's
    double getUltrasonicDistance()
    {
        double duration = pulseIn(echo_pin, 1); // directly cast it to double
        double distance = duration / 58.0;      // formula to get the distance in cm
        return distance;
    }

    // using interrupt
    double getUltrasonicDistance_UsingInterrupt()
    {
        double duration = pulseInTimeEnd - pulseInTimeBegin; // directly cast it to double
        double distance = duration / 58.0;                   // formula to get the distance in cm
        if (distance > previous_Distance)
            return previous_Distance;
        return distance;
    }

    void start_Distance_Mesaurements_Without_Interrupt(unsigned long timeNow)
    {
        if (timeNow - lastTimeUltrasonicTrigger > ultrasonicTriggerDelay)
        {
            lastTimeUltrasonicTrigger += ultrasonicTriggerDelay;
            // trigger sensor
            trigger_UltrasonicSensor();
            // read pulse
            Serial.println(getUltrasonicDistance());
        }
    }

    void start_Distance_Measurements_With_Interrupt(unsigned long timeNow)
    {
        if (timeNow - lastTimeUltrasonicTrigger > ultrasonicTriggerDelay)
        {
            lastTimeUltrasonicTrigger += ultrasonicTriggerDelay;
            // trigger sensor
            trigger_UltrasonicSensor();
        }
        // get distance
        if (newDistanceAvailable)
        {
            newDistanceAvailable = false;
            double distance = getUltrasonicDistance_UsingInterrupt();
            Serial.print(distance);
            Serial.println(" cm");
        }
    }
    ~MySensor() {}
};
