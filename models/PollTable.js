const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pollSchema = new Schema({
    label: {
        type: String
    },
    value: {
        type: Number
    }
}, { timestamps: true });

const PollTable = mongoose.model('Poll', pollSchema);
module.exports.PollTable = PollTable;


