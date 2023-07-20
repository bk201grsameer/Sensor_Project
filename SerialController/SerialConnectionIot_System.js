const { SerialPort } = require('serialport');
// Create a new SerialPort instance with the appropriate settings
const serialPort_iot_System = new SerialPort({
    path: 'COM4',
    baudRate: 9600,
}, (error) => {
    if (error) {
        console.error('Error opening the port:', error.message);
    } else {
        console.log(`Connection OK. Serial port ${'COM4'} is open and ready.`);
    }
});

// Register an error event listener on the SerialPort instance
serialPort_iot_System.on('error', (error) => {
    console.error('[-] Error occurred:', error.message);
});

module.exports.serialPort_iot_System = serialPort_iot_System;