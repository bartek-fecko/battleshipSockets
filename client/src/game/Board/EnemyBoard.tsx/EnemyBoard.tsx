import * as React from 'react';
import 'react-grid-layout/css/styles.css';
import { CreateBoardBackground, CreateBoardCharacters } from './BoardHelpers';

import {
   BoardWrapper,
   EnemyPlayerBoardGrid,
   EnemyTurn,
   MyTurn,
} from './styled';

const Board: React.FC = () => {

   return (
      <BoardWrapper ref={enemyBoardRef}>
         <CreateBoardCharacters
            characters={C.rowNames}
            top={C.BoardDimensions.BoxWidth + C.BoardDimensions.BoxWidth / 2 - 15}
            left={-30}
            increaseBy="top"
         />
         <EnemyPlayerBoardGrid readyToPlay={readyToPlay} >
            <CreateBoardCharacters
               characters={C.colNames}
               left={C.BoardDimensions.BoxWidth + C.BoardDimensions.BoxWidth / 2 - 15}
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
            ? myTurn
               ? <MyTurn>My Turn</MyTurn>
               : <EnemyTurn>Enemy Turn</EnemyTurn>
            : ''
         }
      </BoardWrapper>
   );
};

export default Board;
