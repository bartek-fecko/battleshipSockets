
import * as React from 'react';
import * as io from 'socket.io-client';

// const uri = ;
const socket = io(`https://127.0.0.1:${process.env.PORT}/`,{ transports: ['websocket'] });
socket.on('time', function(timeString) {
   console.log(timeString)
 });

export const App: React.FC = () => {
   return (
      <div>A</div>
   );
};
