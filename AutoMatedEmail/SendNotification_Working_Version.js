const { emailSendFunc } = require("./AutoMatedEmailSender");

// Keep track of the last email sent time
let lastEmailSentTime = 0;
// Flag to indicate if an email has been sent recently
let isEmailSent = false;

module.exports.send_Notification = async () => {
    try {
        // Send the notification email only if 2 seconds have passed since the last email
        const currentTime = Date.now();
        if (!isEmailSent) {
            isEmailSent = true;
            console.log('[+]Sending Email...');
            await emailSendFunc('example@gmail.com', 'Notification!!', `Intrusion Detected`);
            // Update the email sent time and set the flag
            lastEmailSentTime = currentTime;
            console.log('[+] Notification sent and saved successfully...');
            // Delay sending email flag reset for 5 minutes
            setTimeout(() => {
                isEmailSent = false;
            }, 12000);
        }
        else {
            console.log(`[+] waiting.......`);
        }
    } catch (error) {
        console.error('[-] Failed to send notification:', error);
    }
};