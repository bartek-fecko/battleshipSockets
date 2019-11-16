// tslint:disable: no-console
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const battleshipGame_1 = require("./battleshipGame");
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
//socket.emit to connected 
//socket.on listen to the event reply
//socket.broadcast.emit to all other users
//io.emit to all connected
const matchPlayers = () => {
    const playersKeys = Object.keys(players);
    let newGame;
    let readyPlayers;
    readyPlayers = playersKeys.filter((playerId) => players[playerId].isWaiting);
    if (readyPlayers.length > 1) {
        delete players[readyPlayers[0]];
        delete players[readyPlayers[1]];
        newGame = new battleshipGame_1.BattleshipGame(players[readyPlayers[0]], players[readyPlayers[1]], io);
    }
};
io.on('connection', (socket) => {
    players[socket.id] = {
        id: socket.id,
        isWaiting: true,
        socket,
        userName: 'steve',
    };
    console.log(players);
    io.emit('totalUsers', Object.keys(players).length);
    matchPlayers();
    socket.emit('message', messageArray);
    socket.on('totalUsers', () => socket.emit('totalUsers', Object.keys(players).length));
    socket.on('getUsers', () => io.emit(players));
    socket.on('message', (text) => {
        messageArray.push(text);
        io.emit('message', messageArray);
    });
    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('totalUsers', Object.keys(players).length);
    });
});
