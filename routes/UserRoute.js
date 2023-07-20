const express = require('express');
const { utilobj } = require('../utility/Utils');
const { LoginController, SignupController, get_All_User_Controller, update_User, CreateUser, updateAccessLevel } = require('../Controller/UserController');
const router = express.Router();


router.route('/login').post(LoginController);

router.route('/signup').post(SignupController);

router.route('/getallusers').get(utilobj.decode_Token, get_All_User_Controller);

router.route('/updateuser').put(utilobj.decode_Token, update_User);

router.route('/createuser').post(utilobj.decode_Token, CreateUser);

router.route('/updateaccesslevel/:id').put(utilobj.decode_Token, updateAccessLevel);

module.exports = router;