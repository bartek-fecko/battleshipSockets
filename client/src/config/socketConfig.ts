import * as io from 'socket.io-client';

let socket;
// if (process.env.DEVELOP === 'true') {
//    socket = io(`http://localhost:${process.env.PORT}/`);
// } else {
//    socket = io();
// }
socket = io();
export const socketConfig = {
   socket,
};
