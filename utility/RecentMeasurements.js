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
    }

    get_Array() {
        const queueArray = [];
        while (!queue.isEmpty()) {
            const dequeuedElement = queue.dequeue();
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
        this.queue.enqueue(this.measurement_Generator(id, typ, val))
    }
}
const recentmeasurmentobj = new RecentMeasureMents();
module.exports.recentmeasurmentobj = recentmeasurmentobj