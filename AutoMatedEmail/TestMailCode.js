const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports.emailSendFunc = async (To, subject, message) => {
    try {
        // authenticate email 
        let transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS + "#",
            },
        });
        // verify authentication
        transporter.verify(function (error, success) {
            if (error) {
                console.error('[-] Authentication failed:', error);
            } else {
                console.log('[+] Authentication successful');
            }
        });
        // configure options
        const options = {
            from: process.env.EMAIL_USER,
            to: To,
            subject: subject,
            text: message,
        };
        console.log(`[+] Sending Email .......`)
        let info = await transporter.sendMail(options);
        console.log('[+] Message sent:', info);
        return info
    } catch (error) {
        console.log(error.message);
        return false
    }
}