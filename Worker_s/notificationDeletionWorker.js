const { parentPort, workerData } = require('worker_threads');
const { Notification } = require('../models/Notification');

const targetDate = new Date(workerData.targetDate);

// Set the time to 00:00:00 to include all notifications from the previous day
// the deletion will happen every day midnight
targetDate.setHours(0, 0, 0, 0);

Notification.deleteMany({ date: { $lt: targetDate } })
    .then((result) => {
        parentPort.postMessage({ success: true, deletedCount: result.deletedCount });
    })
    .catch((error) => {
        parentPort.postMessage({ success: false, error: error.message });
    });
