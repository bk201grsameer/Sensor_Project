const { User } = require("../models/User")
const { utilobj } = require("../utility/Utils")
const bcrypt = require('bcrypt')

// handle login
module.exports.LoginController = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password)
            throw new Error("ALL FIELDS REQUIRED")
        const user = await User.findOne({ username: username })
        if (!user)
            throw new Error("USER DOESNOT EXIST")
        if (!await bcrypt.compare(password, user.password))
            throw new Error("USER PASSWORD DOESTNOTMATCH")
        usrProfile = utilobj.user_Profile(user)
        return res.json(utilobj.functionReturn(true, { user: usrProfile, token: utilobj.createToken(usrProfile) }))
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message))
    }
}

// handle signup
module.exports.SignupController = async (req, res) => {
    try {
        const { firstname, lastname, username, password, userclass } = req.body
        if (!username || !password || !firstname || !lastname)
            throw new Error("ALL FIELDS REQUIRED")

        const totalUsers = await User.find({})

        if (totalUsers.length != 0 && totalUsers.length >= 2)
            throw new Error("PLEASE CONTACT ADMIN FOR ACCESS")

        if (await User.findOne({ username: username }))
            throw new Error("USER WITH THE EMAIL/Username ALREADY EXISTS")

        const userData = new User({
            firstname: firstname,
            lastname: lastname,
            username: username,
            // to do hash the password 
            password: password,
            userclass: (userclass || userclass != undefined) ? userclass : "student"
        })
        const newuser = await userData.save()
        return res.json(utilobj.functionReturn(true, newuser))
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message))
    }
}

// get all users
module.exports.get_All_User_Controller = async (req, res) => {
    try {
        if (!req.user)
            throw new Error("AUTHENTICATION REQUIRED")

        const totalUsers = await User.find({}, '-password -__v')
        // data to be returned
        const data = {
            totalUsers: totalUsers.length,
            users: totalUsers
        }
        return res.json(utilobj.functionReturn(true, data))
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message))
    }
}