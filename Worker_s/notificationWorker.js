const { Worker } = require('worker_threads');
const { Notification } = require('../models/Notification');

function deleteNotifications(targetDate) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./notificationDeletionWorker.js', {
            workerData: { targetDate },
        });

        worker.on('message', (message) => {
            if (message.success) {
                resolve(message.deletedCount);
            } else {
                reject(new Error(message.error));
            }
        });

        worker.on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = deleteNotifications;