
import * as React from 'react';
import * as io from 'socket.io-client';

let socket;
if (process.env.DEV === 'true') {
   socket = io(`http://localhost:${process.env.PORT}/`)
} else {
   socket = io();
}
socket.on('time', function (timeString) {
   console.log(timeString)
});
fetch('/api/test').then(res => res.json()).then(res => console.log(res))
export const App: React.FC = () => {
   return (
      <div>A</div>
   );
};
