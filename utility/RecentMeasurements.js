const Queue = require('queue-fifo');
const { dateobj } = require('./DateHandler');
class RecentMeasureMents {
    constructor() {
        this.recent_Distance = 0;
        this.recent_Temperature = 0;
        this.recent_Humidity = 0;
        this.temperature_Id = 't#e#m#p'
        this.distance_Id = "d#i#s#t"
        this.humidity_Id = 'h#u#m#i'
        this.queue = new Queue()
        this.distanceQueue = new Queue()
        this.temperatureQueue = new Queue()
        this.humidityQueue = new Queue()
        this.recent_Reading_Flag = true
    }

    get_Array() {
        const queueArray = [];
        while (!this.queue.isEmpty()) {
            const dequeuedElement = this.queue.dequeue();
            queueArray.push(dequeuedElement);
        }
        return queueArray
    }
    get_Array(q) {
        const queueArray = [];
        while (q != undefined && !q.isEmpty()) {
            const dequeuedElement = q.dequeue();
            queueArray.push(dequeuedElement);
        }
        return queueArray
    }

    measurement_Generator(id, typ, val) {
        return {
            "sensorId": this.distance_Id,
            "sensortype": typ,
            "date": dateobj.YYYY_MM_DD(),
            "value": val
        }
    }
    add_Value(id, typ, val) {
        try {
            this.queue.enqueue(this.measurement_Generator(id, typ, val))
            // top 10 recent feeds
            if (this.queue.size() > 10)
                this.queue.dequeue()
        } catch (error) {
            console.log(`[+] ${typ}:is ${val}`)
        }
    }

    add_Value(q, id, typ, val) {
        try {
            q.enqueue(this.measurement_Generator(id, typ, val))
            // top 10 recent feeds
            if (q.size() > 2)
                q.dequeue()
        } catch (error) {
            console.log(`[+] ${typ}:is ${val}`)
        }
    }

    recent_Feed_Insertion_Handler(distance, temperature, humidity) {
        if (distance !== undefined || distance != null)
            this.add_Value(this.distanceQueue, this.distance_Id, "distance", distance)
        if (temperature !== undefined || temperature != null)
            this.add_Value(this.temperatureQueue, this.temperature_Id, "temperature", temperature)
        if (humidity !== undefined || humidity != null)
            this.add_Value(this.humidityQueue, this.humidity_Id, "humidity", humidity)
    }

    get_Net_QueueSize() {
        return this.distanceQueue.size() + this.temperatureQueue.size() + this.humidityQueue.size()
    }
    get_Array_Of_RecentMeasureMents() {
        if (!(this.get_Net_QueueSize() >= 6))
            return
        const tempArray = this.get_Array(this.temperatureQueue)
        const humidityArray = this.get_Array(this.humidityQueue)
        const distanceArray = this.get_Array(this.distanceQueue)
        return tempArray.concat(distanceArray, humidityArray)
    }
}
const recentmeasurmentobj = new RecentMeasureMents();
module.exports.recentmeasurmentobj = recentmeasurmentobj