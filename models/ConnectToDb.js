const mongoose = require('mongoose');

module.exports.ConnectToDb = async () => {
    mongoose.connect('enter your uri here', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase the server selection timeout
        socketTimeoutMS: 45000, // Increase the socket timeout
    })
        .then(() => {
            console.log('MongoDB Connection Succeeded.');
        })
        .catch((err) => {
            console.log('Error in DB connection: ' + err);
        });
}








