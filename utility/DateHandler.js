class MyDateHandler {
    constructor() {

    }
    YYYY_MM_DD() {
        const currentDate = new Date(Date.now());
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        return formattedDate
    }
    Extract_HH_MM_SS(dateString) {
        const timeString = dateString.substring(11, 19);
        return timeString
    }
    HH_MM_SS() {
        const currentTime = new Date(Date.now());
        const formattedTime = currentTime.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        return formattedTime;
    }
    Extract_YYYY_MM_DD(dateTimeString) {
        const dateTimeString = "2023-06-27T12:51:38.159Z";
        const dateString = dateTimeString.substring(0, 10);
        return dateString;
    }
}

const dateobj = new MyDateHandler()
module.exports.dateobj = dateobj