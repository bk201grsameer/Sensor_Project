const express = require('express');
const { chartcontroller } = require('../Controller/ChartController');
const router = express.Router();

router.route('/emailchart/:id').get(chartcontroller.get_chart);
router.route('/barchart').get(chartcontroller.get_Bar_Chart_data);

module.exports = router;