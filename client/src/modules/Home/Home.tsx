import * as React from 'react';
import { Event } from 'react-socket-io';
import * as io from 'socket.io-client';

const Home: React.FC = () => {
   const yep = (message) => {
      console.log(message);
   };
   return (
      <>
        <Event event="yep" handler={yep} />
      </>
   );
};

export default Home;
