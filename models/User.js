const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    userclass: {
        type: String,
        default: "student"
    },
    notificationStatus: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/564x/5a/1c/86/5a1c86ec4fad3739dfe6534317ccacd2.jpg'
    },
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);
//Export the model
module.exports.User = User

