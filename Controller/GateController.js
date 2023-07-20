const { serialPort_iot_System } = require("../SerialController/SerialConnectionIot_System");
const { utilobj } = require("../utility/Utils");


// function to write to serial port
async function writeSerialPortAsync(data) {
    return new Promise((resolve, reject) => {
        serialPort_iot_System.write(data, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

class GateController {
    constructor() {
        this.isGateOpen = 0;
    }
    openGate = async (req, res) => {
        try {
            if (serialPort_iot_System != undefined && serialPort_iot_System.isOpen === false)
                throw new Error("[+] Serial Port Problem");
            this.isGateOpen = 1;
            await writeSerialPortAsync("S1");
            return res.json(utilobj.functionReturn(true, "Gate open"));
        } catch (error) {
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };
    closeGate = async (req, res) => {
        try {
            if (serialPort_iot_System != undefined && serialPort_iot_System.isOpen === false)
                throw new Error("[+] Serial Port Problem");
            this.isGateOpen = 0;
            await writeSerialPortAsync("S0");
            return res.json(utilobj.functionReturn(true, "Gate Close"));
        } catch (error) {
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };
    gateStatus = async (req, res) => {
        return res.json(utilobj.functionReturn(true, this.getGateStatus()));
    };
    getGateStatus = () => {
        return this.isGateOpen;
    };
}

const gatecontroller = new GateController();
module.exports.gatecontroller = gatecontroller;