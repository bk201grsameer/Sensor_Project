const express = require('express');
const cron = require('node-cron');
const { utilobj } = require('./utility/Utils');
const dotenv = require('dotenv');
const { ConnectToDb } = require('./models/ConnectToDb');
const { createServer } = require("http");
const { Server } = require("socket.io");
const morgan = require('morgan');
const cors = require('cors');


const helmet = require('helmet');
const { getSerialData } = require('./SerialController/SerialConnection');
const { SocketManager } = require('./SocketManger/SocketManager');
const deleteNotifications = require('./Worker_s/notificationWorker');

const app = express();


// function to schedule a task which will delete all the prior notifications to current date
cron.schedule('0 0 * * *', async () => {
    const targetDate = new Date();
    targetDate.setHours(0, 0, 0, 0);
    console.log('[+] Deletion of notification Scheduled ');
    try {
        const deletedCount = await deleteNotifications(targetDate);
        console.log(`Deleted ${deletedCount} notifications.`);
    } catch (error) {
        console.error('Error deleting notifications:', error);
    }
});


// socket io config
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

// getarduino data
getSerialData(io);

dotenv.config();
app.use(helmet());

const port = process.env.PORT || 3000;
ConnectToDb();
// using cors to all allow users
app.use(cors());
// Use morgan middleware to log HTTP requests to the console
app.use(morgan('dev'));
// this will allow to handle json 
app.use(express.json());
app.use('/api/user', require('./routes/UserRoute'));

app.get('/', (req, res) => {
    return res.json(utilobj.functionReturn(true, "OK"));
});




// socket management
const socketmanager = new SocketManager();
io.on("connection", (socket) => {
    // on new connection
    console.log(`[+] user connected from: ${socket.id}`);
    socketmanager.add(socket);
    socketmanager.display();

    socket.on('disconnect', () => {
        console.log(`[-] User disconnect from :${socket.id}`);
        socketmanager.remove(socket);
        socketmanager.display();
        console.log('--------------------------------------------------------------------------------------------------');
    });
});



httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});