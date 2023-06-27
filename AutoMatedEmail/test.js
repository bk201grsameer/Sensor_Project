const { emailSendFunc } = require("./AutoMatedEmailSender");

async function test() {
    try {
        await emailSendFunc('nischalkarn369369@gmail.com', 'Test', "working")
    } catch (error) {
        console.log(error.message);
    }
}

test()
