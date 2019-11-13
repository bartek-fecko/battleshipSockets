
import * as React from 'react';
import * as io from 'socket.io-client';

const socket = io();
socket.on('time', function(timeString) {
   console.log(timeString)
 });

export const App: React.FC = () => {
   return (
      <div>A</div>
   );
};
