const express = require('express');
const { downloadController } = require('../Controller/DownloadController');
const router = express.Router();

router.route('/generate-report').get(downloadController.generate_report);


module.exports = router;