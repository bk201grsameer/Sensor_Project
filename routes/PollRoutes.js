const express = require('express');
const { pollcontroller } = require('../Controller/PollController');
const router = express.Router();

router.route('/getpoll').get(pollcontroller.get_Polls);

module.exports = router;