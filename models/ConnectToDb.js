const mongoose = require('mongoose');

module.exports.ConnectToDb = async () => {
    mongoose.connect('mongodb+srv://admin:adminconeprojectapp123@cluster0.s8xdn9i.mongodb.net/sensorprojectdb?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('MongoDB Connection Succeeded.');
        })
        .catch((err) => {
            console.log('Error in DB connection: ' + err);
        });
}









