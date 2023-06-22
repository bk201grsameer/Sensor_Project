#include <Arduino.h>
#include <ArduinoJson.h>
#include "mySensor.h"
#include "led_Control.h"
#include "dht_Control.h"

MySensor sensor = MySensor();
MyLed yellow = MyLed();
MyDHT mydht = MyDHT();

// led config
unsigned long lastTimeWarningLEDBlinked = millis();
unsigned long warningLEDDelay = 500;
byte warningLEDState = LOW;

// pulse low - high read
void echoPinInterrupt()
{
  if (digitalRead(sensor.echo_pin) == HIGH)
  {
    // signal rising
    sensor.pulseInTimeBegin = micros();
  }
  else
  {
    // signal falling
    sensor.pulseInTimeEnd = micros();
    sensor.newDistanceAvailable = true;
  }
}
// function to handle toggle warning
void toggleWarningLED()
{
  warningLEDState = warningLEDState == HIGH ? LOW : HIGH;
  yellow.led_Write(warningLEDState);
}

void warning_Rate_Distance_Based(double distance)
{
  // 0 .. 400 cm -> 0 ..1600 ms
  warningLEDDelay = distance * 4;
}

void sendSensorData(String datakey, double value)
{
  // create a json objec
  StaticJsonDocument<200> jsonobj;
  // add value
  jsonobj[datakey] = value;
  // Serialize the json object to a string
  String jsonString;
  serializeJson(jsonobj, jsonString);
  // Send the JSON string over the serial port
  Serial.println(jsonString);
}

void setup()
{
  Serial.begin(9600);
  yellow.my_Led_Init();
  sensor.my_Sensor_Init();
  mydht.dht->begin();
  attachInterrupt(digitalPinToInterrupt(sensor.echo_pin), echoPinInterrupt, CHANGE);
}

void loop()
{
  unsigned long timeNow = millis();
  // every 100 ms start measuring
  if (timeNow - sensor.lastTimeUltrasonicTrigger > sensor.ultrasonicTriggerDelay)
  {
    sensor.lastTimeUltrasonicTrigger += sensor.ultrasonicTriggerDelay;
    // trigger sensor
    sensor.trigger_UltrasonicSensor();
  }
  // replication non blocking
  if (timeNow - lastTimeWarningLEDBlinked > warningLEDDelay) // the warning delay will be dynamically updated
  {
    lastTimeWarningLEDBlinked += warningLEDDelay;
    // toggle led
    toggleWarningLED();
  }

  // get distance
  if (sensor.newDistanceAvailable)
  {
    sensor.newDistanceAvailable = false;
    double distance = sensor.getUltrasonicDistance_UsingInterrupt();
    warning_Rate_Distance_Based(distance);
    sendSensorData("distance", distance);
  }

  // addanother action to read temperature and humitdity every two seconds
  if (timeNow - mydht.lastTimeDhtTrigger > mydht.dhtTriggerDelay)
  {
    mydht.lastTimeDhtTrigger += mydht.dhtTriggerDelay;
    float temperature = mydht.get_Temperature(); // Read temperature in Celsius;
    float humidity = mydht.get_Humidity();
    sendSensorData("temperature", (double)temperature);
    sendSensorData("humidity", (double)humidity);
  }
}
