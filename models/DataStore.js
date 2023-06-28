const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dataStoreSchema = new Schema({
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

    data: [{ type: Schema.Types.Mixed }],
});
const DataStore = mongoose.model('DataStore', dataStoreSchema);
module.exports.DataStore = DataStore;
