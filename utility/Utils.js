const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

class Util {
    constructor() {
    }
    // response model
    functionReturn(status, message) {
        return { status: status, message: message }
    }
    // create token
    createToken = (payload) => {
        try {
            return jwt.sign(payload, process.env.SECRET)
        } catch (error) {
            return null
        }
    }
    // return userprofile
    user_Profile = (user) => {
        return {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            avatar: user.avatar,
            isAdmin: user.userclass
        }
    }
    // decode the token
    decode_Token = async (req, res, next) => {
        try {
            if (!req.headers.authorization)
                throw new Error("AUTHENTICATION FAILED")
            const token = req.headers.authorization
            const decoded = jwt.verify(token, process.env.SECRET)
            console.log({ decoded });
            req.user = decoded
            next()
        } catch (error) {
            return res.json(this.functionReturn(false, error.message))
        }
    }
}
module.exports.utilobj = new Util()
