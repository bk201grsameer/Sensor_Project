const moment = require('moment');
const { Notification } = require('../models/Notification');
const { dateobj } = require('./DateHandler');
const { NotificationStatus } = require('../models/NotificationStatus');
const { User } = require('../models/User');



async function saveNotificationToDatabase(notificationMessage, io) {
    try {
        console.log(`[+] Updating Notifications.............`);
        const currentDate = moment().format('YYYY-MM-DD');
        const existingNotification = await Notification.findOne({
            date: currentDate
        });

        if (existingNotification) {
            existingNotification.notifications.push(notificationMessage);
            existingNotification.emailCount += 1; // Increase the email sent count
            await existingNotification.save();
            io.emit('notification_event', { data: notificationMessage });



        } else {
            const newNotification = new Notification({
                date: currentDate,
                notifications: [notificationMessage],
                emailCount: 1 // Initialize the email sent count to 1
            });
            await newNotification.save();
            io.emit('notification_event', { data: notificationMessage });
        }
        console.log('[+] Notification saved');
    } catch (error) {
        console.error('Error saving notification:', error);
    }
}

function notificationGenerator(typ, msg) {
    return {
        'type': typ,
        'message': msg,
        'date': dateobj.YYYY_MM_DD(),
        'time': dateobj.HH_MM_SS()
    };
}



// Function to update all existing documents with notificationStatus set to true
async function updateNotificationStatusForAllUsers_appuser() {
    try {
        // Use updateMany() to set notificationStatus to true for all users
        const updateResult = await User.updateMany({}, { notificationStatus: true }, { new: true });
        console.log('Number of documents updated:', updateResult);
    } catch (error) {
        console.error('Error updating notification status:', error);
    }
}



module.exports = {
    saveNotificationToDatabase: saveNotificationToDatabase,
    notificationGenerator: notificationGenerator,
    updateNotificationStatusForAllUsers_appuser: updateNotificationStatusForAllUsers_appuser
};


