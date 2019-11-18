// tslint:disable: no-console
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const battleshipGame_1 = require("./battleshipGame");
const constants_1 = require("./constants");
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
dotenv.config({ path: './.env' });
const PORT = process.env.PORT;
const INDEX = path.join(__dirname, '../client/build/index.html');
const testRoute = require('./routes/posts/test').router;
const server = express()
    .use(cors())
    .use('/api/test', testRoute)
    .use(express.static(path.join(__dirname, '../client/build/')))
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);
const messageArray = [];
const players = {};
// socket.emit to connected
// socket.on listen to the event reply
// socket.broadcast.emit to all other users
// io.emit to all connected
const matchPlayers = () => {
    let newGame;
    let readyPlayers;
    readyPlayers = Object.keys(players).filter((playerId) => players[playerId].isWaiting);
    const newRoom = `room${new Date().valueOf()}`;
    if (readyPlayers.length >= 2) {
        readyPlayers.forEach((playerId) => {
            players[playerId].isWaiting = false;
            players[playerId].roomName = newRoom;
            players[playerId].socket.join(newRoom);
        });
        newGame = new battleshipGame_1.BattleshipGame(players[readyPlayers[0]], players[readyPlayers[1]], io);
    }
};
io.on('connection', (socket) => {
    players[socket.id] = {
        hitsLeft: constants_1.numberOfShipPoints,
        id: socket.id,
        isWaiting: false,
        socket,
    };
    socket.on('setUserName', ({ name, id }) => {
        players[socket.id].userName = name;
        players[socket.id].clientId = id;
    });
    io.emit('totalUsers', Object.keys(players).length);
    socket.on(constants_1.BattleshipEvents.OnPlayerReady, (message) => {
        players[socket.id].isWaiting = true;
        players[socket.id].shipsLayout = message;
        matchPlayers();
    });
    socket.on('totalUsers', () => socket.emit('totalUsers', Object.keys(players).length));
    socket.emit('message', messageArray);
    socket.on('message', (text) => {
        const message = {
            date: new Date().toLocaleString(),
            message: text,
            userName: players[socket.id].userName,
        };
        messageArray.push(message);
        io.emit('message', messageArray);
    });
    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('totalUsers', Object.keys(players).length);
    });
});
