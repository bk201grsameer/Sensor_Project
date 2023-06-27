class MyDateHandler {
    constructor() {

    }
    YYYY_MM_DD() {
        const currentDate = new Date(Date.now());
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
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
        const dateString = dateTimeString.substring(0, 10);
        return dateString;
    }
}

const dateobj = new MyDateHandler()
module.exports.dateobj = dateobj