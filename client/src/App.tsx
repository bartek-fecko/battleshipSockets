import * as React from 'react';
import * as io from 'socket.io-client';
import './globals.sass';

import Board from '#/game/Board/Board';
import Chat from '#/game/Chat/Chat';
import Nav from '#/game/Nav/Nav';

let socket;
if (process.env.DEVELOP === 'true') {
   socket = io(`http://localhost:${process.env.PORT}/`);
} else {
   socket = io();
}

export const App: React.FC = () => {
   return (
      <>
         <Nav />
         <Board />
         <Chat />
      </>
   );
};
