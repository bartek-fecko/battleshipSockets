// tslint:disable: no-console
'use strict';
import { BattleshipGame } from './battleshipGame';
import {
  BattleshipEvents,
  Message,
  numberOfShipPoints,
  Players,
  Socket,
  UserShipsLayout,
} from './constants';

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

const messageArray: Message[] = [];
const players: Players = {};

// socket.emit to connected
// socket.on listen to the event reply
// socket.broadcast.emit to all other users

// io.emit to all connected

const matchPlayers = () => {
  let newGame: BattleshipGame;
  let readyPlayers: string[];
  readyPlayers = Object.keys(players).filter((playerId) => players[playerId].isWaiting);

  const newRoom = `room${new Date().valueOf()}`;
  if (readyPlayers.length >= 2) {
    readyPlayers.forEach((playerId) => {
      players[playerId].isWaiting = false;
      players[playerId].roomName = newRoom;
      players[playerId].socket.join(newRoom);
    });

    newGame = new BattleshipGame(
      players[readyPlayers[0]],
      players[readyPlayers[1]],
      io,
    );
  }
};

io.on('connection', (socket: Socket) => {
  players[socket.id] = {
    hitsLeft: numberOfShipPoints,
    id: socket.id,
    isWaiting: false,
    socket,
  };

  socket.on('setUserName', ({ name, id }) => {
    players[socket.id].userName = name;
    players[socket.id].clientId = id;
  });

  io.emit('totalUsers', Object.keys(players).length);

  socket.on(BattleshipEvents.OnPlayerReady, (message: UserShipsLayout[]) => {
    players[socket.id].isWaiting = true;
    players[socket.id].shipsLayout = message;
    matchPlayers();
  });

  socket.on('totalUsers', () => socket.emit('totalUsers', Object.keys(players).length));

  socket.emit('message', messageArray);

  socket.on('message', (text: string) => {
    const message = {
      date: new Date().toLocaleString(),
      message: text,
      userName: players[socket.id].userName,
    };
    messageArray.push(message as Message);
    io.emit('message', messageArray);
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('totalUsers', Object.keys(players).length);
  });
});
