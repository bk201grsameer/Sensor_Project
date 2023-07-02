const express = require('express');
const { LoginController, SignupController, get_All_User_Controller, update_User } = require('../Controller/UserController');
const { utilobj } = require('../utility/Utils');
const router = express.Router();


router.route('/login').post(LoginController);

router.route('/signup').post(SignupController);

router.route('/getallusers').get(utilobj.decode_Token, get_All_User_Controller);

router.route('/updateuser').put(utilobj.decode_Token, update_User);

module.exports = router;