const { Notification } = require("../models/Notification");
const { dateobj } = require("../utility/DateHandler");
const { utilobj } = require("../utility/Utils");

class NotificationController {
    constructor() {
    }
    get_ALL_Notifications = async (req, res) => {
        try {
            const notifications = await Notification.find({}, '-__v').sort({ updatedAt: -1 });
            return res.json(utilobj.functionReturn(true, notifications[0].notifications));
        } catch (error) {
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };
    get_Email_Count = async (req, res) => {
        try {
            const notifications = await Notification.find({ date: dateobj.YYYY_MM_DD() });
            return res.json(utilobj.functionReturn(true, notifications[0].emailCount));
        } catch (error) {
            return res.json(utilobj.functionReturn(false, error.message));
        }
    };
}
const notificationController = new NotificationController();
module.exports.notificationController = notificationController;