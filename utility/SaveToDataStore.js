const moment = require('moment');
const { DataStore } = require('../models/DataStore');
const { dateobj } = require('./DateHandler');


async function saveDataStoreToDatabase(DataStoreMessage, io) {
    try {
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
    } catch (error) {
        console.error('Error saving DataStore:', error);
    }
}


module.exports = {
    saveDataStoreToDatabase: saveDataStoreToDatabase,
};
