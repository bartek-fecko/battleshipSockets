import * as React from 'react';
import * as io from 'socket.io-client';

import Board from '#/game/Board/Board';

let socket;
if (process.env.DEVELOP === 'true') {
   socket = io(`http://localhost:${process.env.PORT}/`);
} else {
   socket = io();
}

export const App: React.FC = () => {
   return (
      <>
         <Board />
      </>
   );
};
