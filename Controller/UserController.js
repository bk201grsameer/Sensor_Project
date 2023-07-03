const { User } = require("../models/User");
const { utilobj } = require("../utility/Utils");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// handle login
module.exports.LoginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            throw new Error("ALL FIELDS REQUIRED");
        const user = await User.findOne({ username: username });
        if (!user)
            throw new Error("USER DOESNOT EXIST");
        if (!await bcrypt.compare(password, user.password))
            throw new Error("USER PASSWORD DOESTNOTMATCH");
        usrProfile = utilobj.user_Profile(user);
        return res.json(utilobj.functionReturn(true, { user: usrProfile, token: utilobj.createToken(usrProfile) }));
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message));
    }
};

// handle signup
module.exports.SignupController = async (req, res) => {
    try {
        const { firstname, lastname, username, password, userclass } = req.body;
        if (!username || !password || !firstname || !lastname)
            throw new Error("ALL FIELDS REQUIRED");

        const totalUsers = await User.find({});

        if (totalUsers.length != 0 && totalUsers.length >= 5)
            throw new Error("PLEASE CONTACT ADMIN FOR ACCESS");

        if (await User.findOne({ username: username }))
            throw new Error("USER WITH THE EMAIL/Username ALREADY EXISTS");

        const userData = new User({
            firstname: firstname,
            lastname: lastname,
            username: username,
            // to do hash the password 
            password: await bcrypt.hash(password, saltRounds),
            userclass: (userclass || userclass != undefined) ? userclass : "student"
        });
        const newuser = await userData.save();
        return res.json(utilobj.functionReturn(true, newuser));
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message));
    }
};

module.exports.CreateUser = async (req, res) => {
    try {
        const { firstname, lastname, username, password, userclass } = req.body;
        if (!username || !password || !firstname || !lastname)
            throw new Error("ALL FIELDS REQUIRED");

        if (!req.user)
            throw new Error("NO USER LOGGED IN");

        if (!req.user.isAdmin)
            throw new Error("NO AUTHORIZATION TO CREATE IT");

        const totalUsers = await User.find({});
        if (await User.findOne({ username: username }))
            throw new Error("USER WITH THE EMAIL/Username ALREADY EXISTS");

        const userData = new User({
            firstname: firstname,
            lastname: lastname,
            username: username,
            // to do hash the password 
            password: await bcrypt.hash(password, saltRounds),
            userclass: (userclass || userclass != undefined) ? userclass : "student"
        });
        const newuser = await userData.save();
        return res.json(utilobj.functionReturn(true, newuser));
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message));
    }
};


// get all users
module.exports.get_All_User_Controller = async (req, res) => {
    try {
        if (!req.user)
            throw new Error("AUTHENTICATION REQUIRED");
        const totalUsers = await User.find({ username: { $ne: req.user.username } }, '-password -__v').sort({ updatedAt: -1 });
        // data to be returned
        const data = {
            totalUsers: totalUsers.length,
            users: totalUsers,
            loggedInuser: req.user
        };
        return res.json(utilobj.functionReturn(true, data));
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message));
    }
};

// update user
module.exports.update_User = async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body;
        if (!username || !password || !firstname || !lastname)
            throw new Error("ALL FIELDS REQUIRED");
        if (!req.user)
            throw new Error("Login to update your information");
        const anotherUserExists = await User.findOne({ username: username });
        if (anotherUserExists && username != req.user.username)
            throw new Error("USER ALREADY EXISTS WITH THE USERNAME YOU ARE TRYING TO CREATE");
        const updatedUser = await User.findOneAndUpdate({ _id: req.user._id },
            {
                $set: {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: await bcrypt.hash(password, saltRounds)
                }
            },
            { new: true });
        return res.json(utilobj.functionReturn(true, updatedUser));
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message));
    }
};

// update user access level
module.exports.updateAccessLevel = async (req, res) => {
    try {
        const userID = req.params.id;
        if (!userID)
            throw new Error("USER ID REQUIRED");
        const user = await User.findOne({ _id: userID }, '-__v -password');
        if (!user)
            throw new Error("USER NOT FOUND");
        if (user.userclass === "admin")
            throw new Error("Admin Cannot Update the Access Level of other admin");
        const { userclass } = req.body;
        if (!userclass)
            throw new Error("Access level not provided");
        user.userclass = userclass;
        const update_User = await user.save();
        return res.json(utilobj.functionReturn(true, update_User));
    } catch (error) {
        return res.json(utilobj.functionReturn(false, error.message));
    }
};