const express = require('express');
const { notificationController } = require('../Controller/NotificationController');
const { utilobj } = require('../utility/Utils');
const router = express.Router();

router.route('/getallnotifications').get(utilobj.decode_Token, notificationController.get_ALL_Notifications);
router.route('/getemailcount').get(utilobj.decode_Token, notificationController.get_Email_Count);
module.exports = router;