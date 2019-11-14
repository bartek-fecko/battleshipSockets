'use strict';
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

let messageArray: string[] = [];

io.on('connection', (socket) => {
  // tslint:disable: no-console
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));

  io.emit('message', messageArray);

  socket.on('message', (text: string) => {
    messageArray.push(text);
    io.emit('message', messageArray);
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
