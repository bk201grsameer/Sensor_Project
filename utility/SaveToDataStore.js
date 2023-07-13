const moment = require('moment');
const { DataStore } = require('../models/DataStore');
const { dateobj } = require('./DateHandler');
const fs = require('node:fs/promises');


async function saveDataStoreToDatabase(DataStoreMessage, io) {
    try {
        // LOG THE DATA TO OUR FILE
        const fd = await fs.open("D:\\PROJECTS\\CONEPROJECTAPP\\intership\\backend\\Logs\\dataStore_logs.txt", 'w');
        /* CREATE A STREAM FOR FASTER PERFORMANCE */
        const writeStream = fd.createWriteStream();

        const currentDate = moment().format('YYYY-MM-DD');

        const existingDataStore = await DataStore.findOne({
            date: currentDate
        });

        if (existingDataStore) {
            existingDataStore.dataStores.push(DataStoreMessage);
            await existingDataStore.save();
        } else {
            const newDataStore = new DataStore({
                date: currentDate,
                dataStores: [DataStoreMessage],
            });
            await newDataStore.save();
        }
        console.log('[+] DataStore saved');
        writeStream.write(`[+] DataSotreMessage saved date:
        ${dateobj.YYYY_MM_DD()}
        time:${dateobj.HH_MM_SS()}
        \n
        `);
    } catch (error) {
        console.error('Error saving DataStore:', error);
    }
}


module.exports = {
    saveDataStoreToDatabase: saveDataStoreToDatabase,
};
