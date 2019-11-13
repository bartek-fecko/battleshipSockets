'use strict';
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
dotenv.config({ path: './.env' });
const PORT = process.env.PORT;
const INDEX = path.join(__dirname, '../client/build/index.html');
const server = express()
    .use(cors())
    .use(express.static(path.join(__dirname, '../client/build/')))
    .use((req, res) => res.sendFile(INDEX))
    .listen('1649', () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
