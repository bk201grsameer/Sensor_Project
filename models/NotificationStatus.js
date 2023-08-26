const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationStatusSchema = new Schema({
    isThereNotification: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});

const NotificationStatus = mongoose.model('NotificationStatus', notificationStatusSchema);
module.exports.NotificationStatus = NotificationStatus;