// tslint:disable: object-literal-sort-keys
import express, { Application, Response } from 'express';
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app: Application = express();
dotenv.config({ path: './.env' });
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

// mongoose.connect(process.env.MONGO_DB_URI, {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   // tslint:disable: no-console
//   .then(() => console.log('connected to db.'))
//   .catch((err) => console.log(err));

// mongoose.connection.on('error', (err: Error) => console.log('db error:' + err));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api/test', (req, res) => {
  res.send({ yepFromApi: true });
});

app.get('/*', (req, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

io.on('connection', function(socket){
  socket.emit('yep', {yep: true})
});

const port = process.env.PORT;
server.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`listening on port ${port}`);
});

server.timeout = 1000 * 15;
if (process.env.NODE_ENV === 'development') {
  server.timeout = 1000 * 20;
}
