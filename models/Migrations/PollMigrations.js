const { ConnectToDb } = require("../ConnectToDb");
const { PollTable } = require("../PollTable");

function generateRandomValue() {
    const min = 100;
    const max = 500;

    // Generate a random value within the range
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomValue;
}

const data = [
    {
        label: "Active Piezo- Buzzer Module",
        value: generateRandomValue(),
    },
    {
        label: "Flame IR Sensor",
        value: generateRandomValue(),
    },
    {
        label: "Heartbeat/Pulse Sensor",
        value: generateRandomValue(),
    },
    {
        label: "High Sensitivity Microphone Sensor",
        value: generateRandomValue(),
    },
    {
        label: "High-Voltage Relay Module",
        value: generateRandomValue(),
    },
    {
        label: "Infrared (IR) Transmitter",
        value: generateRandomValue(),
    },
    {
        label: "Joystick Module",
        value: generateRandomValue(),
    },
];

async function addData() {
    try {
        await ConnectToDb();
        await PollTable.insertMany(data);
        console.log('Data added successfully');
    } catch (error) {
        console.error('Error adding data:', error);
    }
}
addData();