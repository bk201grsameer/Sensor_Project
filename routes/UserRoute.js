const express = require('express')
const { LoginController, SignupController, get_All_User_Controller } = require('../Controller/UserController')
const { utilobj } = require('../utility/Utils')
const router = express.Router()


router.route('/login').post(LoginController)

router.route('/signup').post(SignupController)

router.route('/getallusers').get(utilobj.decode_Token, get_All_User_Controller)

module.exports = router