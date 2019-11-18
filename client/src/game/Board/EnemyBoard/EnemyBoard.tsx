import { appVariables } from '#/config/appConstants';
import { CreateBoardBackground, CreateBoardCharacters } from '#/game/Board/BoardHelpers';
import { BoardDimensions, colNames, rowNames } from '#/game/Board/constants';
import { BoardWrapper } from '#/game/Board/styled';
import * as React from 'react';
import 'react-grid-layout/css/styles.css';
import {
   EnemyPlayerBoardGrid,
   EnemyTurn,
   MyTurn,
} from './styled';

interface EnemyBoardProps {
   readyToPlay: boolean;
   myTurn: boolean;
   onFieldClick: (e: React.MouseEvent<HTMLElement>) => any;
   ref: React.Ref<any>;
}

const EnemyBoard: React.FC<EnemyBoardProps> = React.forwardRef((
   { readyToPlay, myTurn, onFieldClick }, ref) => {
   const socket = appVariables.socket;
   const [allPlayers, setAllPlayers] = React.useState<number>();

   socket.on('totalUsers', (playersAmmount: number) => setAllPlayers(playersAmmount));

   return (
      <BoardWrapper ref={ref}>
         <CreateBoardCharacters
            characters={rowNames}
            top={BoardDimensions.BoxWidth + BoardDimensions.BoxWidth / 2 - 15}
            left={-30}
            increaseBy="top"
         />
         <EnemyPlayerBoardGrid readyToPlay={readyToPlay} >
            <CreateBoardCharacters
               characters={colNames}
               left={BoardDimensions.BoxWidth + BoardDimensions.BoxWidth / 2 - 15}
               top={-30}
               increaseBy="left"
            />
            {readyToPlay && (
               <CreateBoardBackground
                  hover
                  onFieldClick={onFieldClick}
               />
            )}
         </EnemyPlayerBoardGrid>
         {readyToPlay
            ? allPlayers < 2
               ? 'There is no enough players. Waiting for players.'
               : myTurn
                  ? <MyTurn>My Turn</MyTurn>
                  : <EnemyTurn>Enemy Turn</EnemyTurn>
            : ''
         }
      </BoardWrapper>
   );
});

export default EnemyBoard;
