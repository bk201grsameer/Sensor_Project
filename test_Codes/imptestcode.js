const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { emailSendFunc } = require('../AutoMatedEmail/AutoMatedEmailSender');
const { send_Notification } = require('../AutoMatedEmail/SendNotification');
const { distance_heap } = require('../utility/DataHandler');

const limiterTIme = 1000 * 60 * 2; // every 2 minutes

let set_Top_ReadingFlag_Distance = true;
let lastEmailSentTime = 0;
let isEmailSent = false;
let count_Email_Sent = 0;

const serialPort = new SerialPort({
    path: 'COM3',
    baudRate: 9600,
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

module.exports.getSerialData = (io) => {
    async function x() {
        // Make database call asynchronously
        // Example implementation:
        try {
            const result = await makeDatabaseCall();
            console.log('Database call result:', result);
        } catch (error) {
            console.error('Error in database call:', error);
        }
    }

    async function y() {
        // Make another call asynchronously
        // Example implementation:
        try {
            const result = await makeAnotherCall();
            console.log('Another call result:', result);
        } catch (error) {
            console.error('Error in another call:', error);
        }
    }

    try {
        parser.on('data', async function (data) {
            // handle data
            try {
                sensordata = JSON.parse(data);
                const { distance, temperature, humidity } = sensordata;

                if (distance !== undefined && distance < 300) {
                    distance_heap.push({ x: new Date().toISOString(), y: distance });
                    if (distance_heap.size() > 10)
                        distance_heap.pop();

                    if (set_Top_ReadingFlag_Distance === true && distance_heap.size() >= 10) {
                        console.log({ id: "DangerAlert", color: "#4cceac", data: distance_heap.toArray() });
                        console.log({ emailSent: count_Email_Sent });
                        set_Top_ReadingFlag_Distance = false;
                        io.emit('top_reading_distance_event', { data: { id: "DangerAlert", color: "#4cceac", data: distance_heap.toArray() } });
                        setTimeout(() => {
                            set_Top_ReadingFlag_Distance = true;
                        }, 5000);
                    }

                    if (distance < 10 && (Date.now() - lastEmailSentTime > limiterTIme)) {
                        if (!isEmailSent) {
                            console.log('TO DO EMAIL SEND');
                            count_Email_Sent += 1;
                            io.emit('email_event', { data: count_Email_Sent });
                            await x();
                        }

                        lastEmailSentTime = Date.now();
                        isEmailSent = true;

                        setTimeout(() => {
                            isEmailSent = false;
                        }, limiterTIme);
                    }

                    if (io !== undefined)
                        io.emit('distance_event', { distance: distance });
                }

                if (temperature !== undefined)
                    io.emit('temperature_event', { temperature: temperature });

                if (humidity !== undefined)
                    io.emit('humidity_event', { humidity: humidity });

                await y(); // Call function y asynchronously
            } catch (error) {
                console.log(`[-] Something went wrong during parsing data: ${error.message}`);
            }
        });

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
}
module.exports.parser = parser
module.exports.serialPort = serialPort


/* 
Yes, if you use await x(), it will block the execution of the subsequent statements until the x() function completes. If you want to avoid blocking the execution, you can remove the await keyword and let x() execute asynchronously in the background. Here's an updated version:

javascript
Copy code
if (distance < 10 && (Date.now() - lastEmailSentTime > limiterTIme)) {
  if (!isEmailSent) {
    console.log('TO DO EMAIL SEND');
    count_Email_Sent += 1;
    io.emit('email_event', { data: count_Email_Sent });
    x(); // Call x() asynchronously without using await
  }

  lastEmailSentTime = Date.now();
  isEmailSent = true;

  setTimeout(() => {
    isEmailSent = false;
  }, limiterTIme);
}
With this change, x() will be invoked asynchronously, allowing the subsequent statements to execute without waiting for its completion.
 */