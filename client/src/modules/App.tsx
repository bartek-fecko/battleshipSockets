import { RootRouter } from '#/modules/RootRouting/RootRouting';
import * as React from 'react';
import { Socket } from 'react-socket-io';

const uri = `https://testwebpacksocket.herokuapp.com:${process.env.PORT}/`;
const options = { transports: ['websocket'] };

export const App: React.FC = () => {
   return (
      <Socket uri={uri} options={options}>
         <RootRouter />
      </Socket>
   );
};
