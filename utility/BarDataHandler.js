class BarDataHandlerClass {
    constructor() {
        this.intrusion = +1e9;
        this.humidity = -1e9;
        this.temperature = -1e9;
    }
    update_Intrustion(distance) {
        if (!distance || distance == undefined || distance == null)
            return;
        this.intrusion = Math.min(distance);
    }
    update_Humidity(humidity) {
        if (!humidity || humidity == undefined || humidity == null)
            return;
        this.humidity = Math.max(humidity);
    }
    update_temperature(temperature) {
        if (!temperature || temperature == undefined || temperature == null)
            return;
        this.temperature = Math.max(temperature);
    }
    update_BarData(distance, humidity, temperature) {
        this.update_Intrustion(distance);
        this.update_Humidity(humidity);
        this.update_temperature(temperature);
    }
}
const barobj = new BarDataHandlerClass();
module.exports.barobj = barobj;