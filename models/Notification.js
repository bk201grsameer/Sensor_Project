const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
    date: {
        type: String,
        set: function (date) {
            if (date instanceof Date) {
                // Format the date as "YYYY-MM-DD"
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            return date;
        },
        default: function () {
            // Set the default value as the current date in "YYYY-MM-DD" format
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },

    notifications: [{ type: Schema.Types.Mixed }],
    emailCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
const Notification = mongoose.model('Notification', notificationSchema);
module.exports.Notification = Notification;
