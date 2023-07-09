const { ConnectToDb } = require("../ConnectToDb");
const { Notification } = require("../Notification");

// update the previous time stamps
async function updateTimeStamps() {
    try {
        console.log('[+] Conntection to Db');
        await ConnectToDb();
        console.log('[+] updation init');
        const notifications = await Notification.find({}).exec();
        for (const notification of notifications) {
            const date = new Date(notification.date);
            notification.createdAt = date;
            notification.updatedAt = date;
            await notification.save();
        }
        console.log('[+] notifications updated successfully.');
    } catch (error) {
        console.error('[-] notifications updating documents:', error);
    }
}
async function addData(){
    try {
        
    } catch (error) {
        
    }
}