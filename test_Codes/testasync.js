module.exports.getSerialData = async (io) => {
    try {
        parser.on('data', async function (data) {
            console.log(`arduino data`, {
                "sensordata": data
            });

            // Perform asynchronous operations
            const result = await performAsyncOperation(data);

            // Emit event or perform further async operations
            await emitEvent(result);
        });

        // ...
    } catch (error) {
        console.error('An error occurred while listening to the serial port:', error);
    } finally {
        // ...
    }
};

async function performAsyncOperation(data) {
    return new Promise((resolve, reject) => {
        // Perform your asynchronous operation here, e.g., making an API call, querying a database, etc.
        // Resolve or reject the promise based on the operation's result or error
    });
}

async function emitEvent(result) {
    // Emit event or perform further asynchronous operations
}