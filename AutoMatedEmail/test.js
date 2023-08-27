const { emailSendFunc } = require("./AutoMatedEmailSender");

async function test() {
    try {
        await emailSendFunc('email@example.com', 'Test', "working")
    } catch (error) {
        console.log(error.message);
    }
}

test()
