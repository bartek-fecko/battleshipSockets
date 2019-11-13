"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: object-literal-sort-keys
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express_1.default();
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
app.use(express_1.default.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express_1.default.static(path.join(__dirname, '../client/build')));
app.get('/api/test', (req, res) => {
    res.send({ yepFromApi: true });
});
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
io.on('connection', function (socket) {
    socket.emit('yep', { yep: true });
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
