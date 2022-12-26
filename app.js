const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const configs = require('./config/config');
const { cronRunner } = require('./cron');
const swaggerJson = require('./swagger.json');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = socketIO(server, { cors: 'http://localhost:80' });

io.on('connection', (socket) => {

    socket.on('disconnect', (socket) => {
        console.log(`Socket ${socket.id} was disconnected`);
    });

    // console.log(socket.id);
    //
    // console.log(socket.handshake.auth);
    // console.log(socket.handshake.query);

    socket.on('message:send', (messageData) => {
        console.log(messageData.text);

        //SEND ONE TO ONE EVENT
        // socket.emit('message:new',messageData.text)

        //SEND EVENT TO ALL EXCEPT EMITER
        // socket.broadcast.emit('message:new',messageData.text)

        //SEND EVENT TO ALL CLIENTS
        io.emit('message:new', messageData.text);


    });

    socket.on('room:join', (roomInfo) => {
        socket.join(roomInfo.roomId); // SOCKET JOIN ROOM
        // socket.leave(roomInfo.roomId); // SOCKET LEAVE ROOM

        // SEND TO ALL IN ROOM EXCEPT NEW MEMBER
        // socket.to(roomInfo.roomId).emit('user:room:join',socket.id)

        // SEND TO ALL ROOM MEMBERS
        io.to(roomInfo.roomId).emit('user:room:join', socket.id);
    });
});




app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.get('/', (req, res) => {
    res.json('WElCOME');
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500,
    });
});

server.listen(configs.PORT, async () => {
    await mongoose.connect(configs.MONGO_URL);
    console.log(`Server listen ${configs.PORT}`);
    // cronRunner();
});






