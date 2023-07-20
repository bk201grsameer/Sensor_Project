const { DataStore } = require('../models/DataStore');
const { Notification } = require("../models/Notification");
const { utilobj } = require("../utility/Utils");


class ChartController {
    constructor() {
        this.email_Color = "hsl(276, 70%, 50%)";
        // this.timerSeconds = 10000; //every 5 minutes
        this.colorObj = {
            distanceColor: "hsl(229, 70%, 50%)",
            temperatureColor: "hsl(296, 70%, 50%)",
            humidityColor: "hsl(97, 70%, 50%)"
        };
    }

    data_generator_Line = (id, color, data) => {
        return {
            id: id,
            color: color,
            data: data
        };
    };
    get_chart = async (req, res) => {
        try {
            if (!req.params.id)
                throw new Error("CHART _ID REQUIRED");
            let data = '';
            if (req.params.id === "1")
                data = await this.get_Email_Chart(); //for email chart id 0
            else {
                const ds = await this.get_Data_Store_Chart();
                if (req.params.id === "2") {
                    // for distance chart id=1
                    const dataArr = ds.map((d) => {
                        return {
                            x: d.date,
                            y: d.dataStores[0].distance
                        };
                    });
                    data = this.data_generator_Line("Distance_Variation", this.colorObj.distanceColor, dataArr);
                }
                else if (req.params.id === "3") {
                    // for humidity id ==2
                    const dataArr = ds.map((d) => {
                        return {
                            x: d.date,
                            y: d.dataStores[0].humidity
                        };
                    });
                    data = this.data_generator_Line("Humidity_Variation", this.colorObj.humidityColor, dataArr);
                }
                else if (req.params.id === '4') {
                    // for temperature id ==2
                    const dataArr = ds.map((d) => {
                        return {
                            x: d.date,
                            y: d.dataStores[0].temperature
                        };
                    });
                    data = this.data_generator_Line("Temperature_Variation", this.colorObj.temparature, dataArr);
                }
            }

            return res.json(utilobj.functionReturn(true, [data]));
        } catch (error) {
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };

    // generatate email chart
    get_Email_Chart = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const notifications = await Notification.find({}, '-__v -_id -notifications -createdAt -updatedAt');
                const data = notifications.map(({ date, emailCount }) => {
                    return {
                        x: date,
                        y: emailCount
                    };
                });
                resolve(this.data_generator_Line("emailanalysis", this.email_Color, data));
            } catch (error) {
                reject(error);
            }
        });
    };
    // generate distance chart
    get_Data_Store_Chart = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const datastoredata = await DataStore.find({}, '-__v -_id  -createdAt -updatedAt');
                resolve(datastoredata);
            } catch (error) {
                reject(error);
            }
        });
    };

    // get barchart data
    get_Bar_Chart_data = async (req, res) => {
        try {
            const ds = await DataStore.find({}, '-__v -_id  -createdAt -updatedAt -date');
            const barData = ds.map((ob) => {
                return ob.dataStores[0];
            });
            return res.json(utilobj.functionReturn(true, barData));
        } catch (error) {
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };

}

const chartcontroller = new ChartController();
module.exports.chartcontroller = chartcontroller;