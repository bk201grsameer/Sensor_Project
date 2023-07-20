const express = require('express');
const { gatecontroller } = require('../Controller/GateController');
const router = express.Router();



router.route('/getGateStatus').get(gatecontroller.gateStatus);

router.route('/opengate').get(gatecontroller.openGate);

router.route("/closegate").get(gatecontroller.closeGate);


module.exports = router;