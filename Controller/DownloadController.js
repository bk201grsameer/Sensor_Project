const { DataStore } = require("../models/DataStore");
const { utilobj } = require("../utility/Utils");
const { Transform } = require('stream');

class DownLoadController {
    constructor() {

    }
    generate_report_Test = async (req, res) => {
        try {
            const dataStream = DataStore.find().cursor(); // Create a stream to fetch data from MongoDB.

            // Set response headers for the download.
            res.setHeader('Content-disposition', 'attachment; filename=report.txt');
            res.setHeader('Content-Type', 'text/plain');

            // Function to handle each document from MongoDB before writing to the response.
            const processDocument = (doc) => {
                return `${doc.name}, ${doc.age}\n`; // Modify the data to create the report content.
            };

            // Write the report header to the response stream.
            res.write("Name, Age\n");

            let isPaused = false;

            // Listen for the 'data' event from the data stream.
            dataStream.on('data', (doc) => {
                const line = processDocument(doc); // Process the document.

                // Check if the response stream's buffer is full.
                if (!res.write(line)) {
                    // If the buffer is full, pause the data stream to handle backpressure.
                    dataStream.pause();
                    isPaused = true;
                }
            });

            // Listen for the 'drain' event from the response stream.
            res.on('drain', () => {
                // When the response stream is ready to receive more data, resume the data stream.
                if (isPaused) {
                    dataStream.resume();
                    isPaused = false;
                }
            });

            // When the data stream ends, close the response stream.
            dataStream.on('end', () => {
                res.end();
            });

        } catch (error) {
            console.error('Error fetching data from MongoDB:', error);
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };
    generate_report = async (req, res) => {
        try {
            const dataStream = DataStore.find().cursor(); // Create a stream to fetch data from MongoDB.

            // Set response headers for the download.
            res.setHeader('Content-disposition', 'attachment; filename=report.txt');
            res.setHeader('Content-Type', 'text/plain');

            // Write the report header to the response stream.
            res.write("Date, Data\n");

            let isPaused = false;

            // Listen for the 'data' event from the data stream.
            dataStream.on('data', (doc) => {
                // Format the date in "YYYY-MM-DD" format.
                const formattedDate = new Date(doc.date).toISOString().slice(0, 10);

                // Handle each dataStore item in the array.
                doc.dataStores.forEach((dataItem) => {
                    // Format the data as needed for the report.
                    const dataLine = `${formattedDate}, ${JSON.stringify(dataItem)}\n`;

                    // Check if the response stream's buffer is full.
                    if (!res.write(dataLine)) {
                        // If the buffer is full, pause the data stream to handle backpressure.
                        dataStream.pause();
                        isPaused = true;
                    }
                });
            });

            // Listen for the 'drain' event from the response stream.
            res.on('drain', () => {
                // When the response stream is ready to receive more data, resume the data stream.
                if (isPaused) {
                    dataStream.resume();
                    isPaused = false;
                }
            });

            // When the data stream ends, close the response stream.
            dataStream.on('end', () => {
                res.end();
            });

        } catch (error) {
            console.error('Error fetching data from MongoDB:', error);
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };

}

const downloadController = new DownLoadController();
module.exports.downloadController = downloadController;

// Read for the understanding
/* 
The code is using HTTP streams to handle data transfer between the server and the client. HTTP streams are built on top of the HTTP protocol, and they facilitate efficient data transmission 
In the provided code, the server uses the HTTP response stream (res) to send data to the client, and the client uses the Fetch API to receive the data in chunks and initiate the file download. The data is streamed over the standard HTTP request-response cycle.

Here's how the data transfer works:

When the React client sends an HTTP GET request to the server's /generate-report endpoint, the server starts fetching data from MongoDB using a Mongoose cursor-based Readable stream.

As data is fetched from MongoDB in chunks, it is transformed into text using a Transform stream (transformStream).

The transformed data is then sent to the client as an HTTP response using the pipe() method, which writes the data to the HTTP response stream (res). The client receives the data in the Fetch API response.

The client initiates the file download when it receives the data in the response using the blob() method.

The beauty of using streams in this scenario is that it allows the server to efficiently handle large amounts of data without consuming excessive memory. It also enables the client to start downloading the data while it is still being fetched from the database.
*/

/* 
The dataStream is a Readable stream created using DataModel.find().cursor(), which fetches data from MongoDB using Mongoose's find() method. This stream reads data from the MongoDB cursor in chunks.

The transformStream is a Transform stream created using Transform. It receives data from the dataStream and processes it. In this case, it transforms each fetched document into a line of text (e.g., Sample Report Line\n). The transform function is called for each chunk of data received from the dataStream.

The transformed data from the transformStream is then piped to the HTTP response stream (res). The HTTP response stream is a Writable stream that sends data back to the client's browser. As data is received from the transformStream, it's sent to the client as part of the HTTP response.

Backpressure handling: When the client is slow to consume the data, the 'drain' event on the HTTP response stream (res) is triggered. In response to the 'drain' event, the server pauses the data stream (dataStream.pause()) to prevent overwhelming the client. When the client is ready to receive more data, it emits a 'resume' event, and the server resumes the data stream (dataStream.resume()), allowing the data to flow to the client.

When the dataStream ends (i.e., there is no more data to read from the MongoDB cursor), the 'end' event is triggered. The server then closes the HTTP response stream (res.end()), completing the response and ending the file download on the client-side.

In summary, the provided code streams the report data directly to the client without writing it to a file on the server. The use of streams and backpressure handling ensures that the server efficiently serves data from MongoDB to the client without consuming excessive memory or overwhelming the client's browser during the download process.
*/