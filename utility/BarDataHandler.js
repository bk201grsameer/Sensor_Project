const { dateobj } = require("./DateHandler");

class BarDataHandlerClass {
    constructor() {
        this.intrusion = +1e9;
        this.humidity = -1e9;
        this.temperature = -1e9;
        this.bar_Reading_Flag = true;
        this.timerSeconds = 5 * 60 * 1000; //every 5 minutes
        // this.timerSeconds = 10000; //every 5 minutes
        this.colorObj = {
            distanceColor: "hsl(229, 70%, 50%)",
            temperatureColor: "hsl(296, 70%, 50%)",
            humidityColor: "hsl(97, 70%, 50%)"
        };
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
    data_Generator() {
        return {
            date: dateobj.YYYY_MM_DD(),
            distance: this.intrusion,
            distanceColor: this.colorObj.distanceColor,
            humidity: this.humidity,
            humidityColor: this.colorObj.humidityColor,
            temperature: this.temperature,
            temperatureColor: this.colorObj.temperatureColor
        };
    }
}
const barobj = new BarDataHandlerClass();
module.exports.barobj = barobj;