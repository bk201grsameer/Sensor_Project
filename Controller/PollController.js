const { PollTable } = require("../models/PollTable");
const { utilobj } = require("../utility/Utils");
class PollController {
    constructor() {

    }
    get_Polls = async (req, res) => {
        try {
            const data = await PollTable.find({}, '-__v');
            if (!data)
                throw new Error("NO POLL DATA");
            const polldata = data.map(({ _id, label, value, createdAt, updatedAt }) => {
                return {
                    id: _id,
                    label,
                    value,
                    color: this.generateRandomColor()
                };
            });
            return res.json(utilobj.functionReturn(true, polldata));
        } catch (error) {
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };

    generateRandomColor = () => {
        // Generate random values for hue, saturation, and lightness
        const hue = Math.floor(Math.random() * 361); // Range: 0 to 360
        const saturation = Math.floor(Math.random() * 101); // Range: 0 to 100
        const lightness = Math.floor(Math.random() * 101); // Range: 0 to 100
        // Return the color in HSL format
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

}
const pollcontroller = new PollController();
module.exports.pollcontroller = pollcontroller;