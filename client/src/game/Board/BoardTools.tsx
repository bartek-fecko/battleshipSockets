import * as React from 'react';
import {
   BoardToolsWrapper,
   StartGameButton,
} from './styled';

interface BoardToolsProps {
   readyToPlay: boolean;
   onStartGame: () => void;
}

const BoardTools: React.FC<BoardToolsProps> = ({ onStartGame, readyToPlay }) => {

   return (
      <BoardToolsWrapper>
         <StartGameButton
            onClick={onStartGame}
            readyToPlay={readyToPlay}
         >
            Start Game
         </StartGameButton>
      </BoardToolsWrapper>
   );
};

export default BoardTools;
