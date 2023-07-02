const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { emailSendFunc } = require('../AutoMatedEmail/AutoMatedEmailSender');
const { send_Notification } = require('../AutoMatedEmail/SendNotification');
const { distance_heap } = require('../utility/DataHandler');
const { recentmeasurmentobj } = require('../utility/RecentMeasurements');
const { saveNotificationToDatabase, notificationGenerator } = require('../utility/SaveNotificationToDatabase');
const { barobj } = require('../utility/BarDataHandler');
const { saveDataStoreToDatabase } = require('../utility/SaveToDataStore');
const cron = require('node-cron');

let dataStoreMessage; // Define a variable to store the DataStoreMessage

// const limiterTIme = 3600 * 1000 * 3; //every 3 hr
const limiterTIme = 1000 * 60 * 1; //every 2 minutes

let set_Top_ReadingFlag_Distance = true;

// Keep track of the last email sent time
let lastEmailSentTime = 0;
// Flag to indicate if an email has been sent recently
let isEmailSent = false;
// count number of emails sent
let count_Email_Sent = 0;




const serialPort = new SerialPort({
    path: 'COM3',
    baudRate: 9600,
});


const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));


module.exports.getSerialData = (io) => {
    try {
        //schedule to Save bar data to the database every day
        cron.schedule('0 0 * * *', () => {
            if (dataStoreMessage) {
                saveDataStoreToDatabase(dataStoreMessage, io);
            }
        });

        parser.on('data', async function (data) {
            // handle data
            try {
                sensordata = JSON.parse(data);
                // retrive the data
                const { distance, temperature, humidity } = sensordata;
                // bar data handler
                barobj.update_BarData(distance, humidity, temperature);
                if (barobj.bar_Reading_Flag === true) {
                    // generate a barobj data every 5 seconds
                    dataStoreMessage = barobj.data_Generator();
                    console.log(`[+] Bar data`, dataStoreMessage);
                    barobj.bar_Reading_Flag = false;
                    setTimeout(() => {
                        barobj.bar_Reading_Flag = true;
                    }, 5000);
                }

                // recent Measurements
                recentmeasurmentobj.recent_Feed_Insertion_Handler(distance, temperature, humidity);

                if (recentmeasurmentobj.recent_Reading_Flag === true &&
                    recentmeasurmentobj.get_Net_QueueSize() >= 6) {

                    io.emit('recent_measurement_event', recentmeasurmentobj.get_Array_Of_RecentMeasureMents());

                    recentmeasurmentobj.recent_Reading_Flag = false;
                    setTimeout(() => {
                        recentmeasurmentobj.recent_Reading_Flag = true;
                    }, 25000);
                }


                // console.log(`[+]data`, sensordata);
                const currentTime = Date.now();
                // intrusion handler
                if (distance !== undefined && distance < 300) {
                    distance_heap.push({ x: new Date().toISOString(), y: distance });
                    if (distance_heap.size() > 10)
                        distance_heap.pop();
                    // timer for every five seond to send  top 10 distance intrusion readings
                    if (set_Top_ReadingFlag_Distance === true && distance_heap.size() >= 10) {
                        console.log({ id: "DangerAlert", color: "#4cceac", data: distance_heap.toArray() });
                        console.log({ emailSent: count_Email_Sent });
                        // main logic to handle sending distance every five second
                        set_Top_ReadingFlag_Distance = false;
                        io.emit('top_reading_distance_event', { data: { id: "DangerAlert", color: "#4cceac", data: distance_heap.toArray() } });
                        setTimeout(() => {
                            set_Top_ReadingFlag_Distance = true;
                        }, 5000);
                    }


                    // if distance is less than 15 the
                    if (distance < 10 && (currentTime - lastEmailSentTime > limiterTIme)) {
                        if (!isEmailSent) {
                            console.log('TO DO EMAIL SEND');
                            count_Email_Sent += 1;

                            //send_Notification()
                            // send email sent_count as well
                            saveNotificationToDatabase(notificationGenerator('Intrusion', 'Intrusion Detection'), io);
                            io.emit('email_event', { data: count_Email_Sent });
                        }

                        // Update the email sent time and set the flag
                        lastEmailSentTime = currentTime;
                        isEmailSent = true;
                        // update the email send to false after two minutes
                        setTimeout(() => {
                            isEmailSent = false;
                        }, limiterTIme);
                    }
                    if (io !== undefined)
                        await io.emit('distance_event', { distance: distance });
                }

                //temperature handler
                if (temperature !== undefined)
                    await io.emit('temperature_event', { temperature: temperature });

                //humidity handler
                if (humidity !== undefined)
                    await io.emit('humidity_event', { humidity: humidity });


            } catch (error) {
                console.log(`[-] Something went wrong during parsing data:${error.message}`);
            }
        });

        // Close the serial port when the Node.js process exits
        process.on('exit', () => {
            console.log('Closing serial port...');
            if (serialPort.isOpen) {
                serialPort.close();
            }
        });

        // Handle errors that occur on the serial port
        serialPort.on('error', (err) => {
            console.error('Serial port error:', err);
        });

    } catch (error) {
        console.error('An error occurred while listening to the serial port:', error);
    } finally {
        // Close the serial port after the function finishes executing or if an error occurred
        if (serialPort.isOpen) {
            serialPort.close((error) => {
                if (error) {
                    console.error('An error occurred while closing the serial port:', error);
                } else {
                    console.log('Serial port closed successfully.');
                }
            });
        }
    }
};



module.exports.parser = parser;
module.exports.serialPort = serialPort;