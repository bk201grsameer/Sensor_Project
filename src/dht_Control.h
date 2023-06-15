#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

class MyDHT
{
public:
    int DHT_PIN = 8;
    int DHT_TYPE = DHT11;
    // default timer config
    unsigned long lastTimeDhtTrigger = millis();
    unsigned long dhtTriggerDelay = 2000; //every 2secs
    DHT *dht;                                     // Use a pointer to the DHT object
    MyDHT() { dht = new DHT(DHT_PIN, DHT_TYPE); } // Dynamically allocate memory
    MyDHT(int DHT_PIN, int DHT_TYPE)
    {
        this->DHT_PIN = DHT_PIN;
        this->DHT_TYPE = DHT_TYPE;
        dht = new DHT(DHT_PIN, DHT_TYPE); // Dynamically allocate memory
    }
    float get_Temperature() { return dht->readTemperature(); } // Access the DHT object using the pointer
    float get_Humidity() { return dht->readHumidity(); }
    ~MyDHT() { delete dht; } // Deallocate the memory in the destructor
};
