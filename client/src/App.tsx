import '#/config/globals.sass';
import * as React from 'react';
import styled from 'styled-components';

import Board from '#/game/Board/Board';
import Chat from '#/game/Chat/Chat';
import Nav from '#/modules/Nav/Nav';
import WelcomeScreen from './modules/WelcomeScreen/WelcomeScreen';

const MainContent = styled.div`
   display: flex;
`;

export const App: React.FC = () => {
   return (
      <>
         <WelcomeScreen />
         <Nav />
         <MainContent>
            <Board />
            <Chat />
         </MainContent>
      </>
   );
};
