import '#/config/globals.sass';
import * as React from 'react';
import styled from 'styled-components';

import Chat from '#/modules/Chat/Chat';
import Board from '#/modules/Game/Board/Board';
import Nav from '#/modules/Nav/Nav';
import WelcomeScreen from '#/modules/WelcomeScreen/WelcomeScreen';

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
