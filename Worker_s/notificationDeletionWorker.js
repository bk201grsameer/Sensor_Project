const { parentPort, workerData } = require('worker_threads');
const { Notification } = require('../models/Notification');
const { ConnectToDb } = require('../models/ConnectToDb');


// Delete notifications prior to the provided date
async function deleteNotifications() {
    console.log('[+] will soon get the data');
    try {
        console.log('first connect to db');
        await ConnectToDb();
        const deletionDate = new Date(workerData.targetDate);
        const result = await Notification.find({ date: { $lt: deletionDate } });
        parentPort.postMessage({ success: true, deletedCount: result.length });
    } catch (error) {
        console.log('[Randi] ', error);
        parentPort.postMessage({ success: false, error: error.message });
    }
}

deleteNotifications();



// Notification.deleteMany({ date: { $lt: targetDate } })
//     .then((result) => {
//         parentPort.postMessage({ success: true, deletedCount: result.deletedCount });
//     })
//     .catch((error) => {
//         parentPort.postMessage({ success: false, error: error.message });
//     });


