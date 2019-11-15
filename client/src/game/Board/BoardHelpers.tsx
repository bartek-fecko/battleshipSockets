import * as React from 'react';
import {
   BoardCharactersWrapper,
   BoardNameCharacter,
   BoardSquare,
} from './styled';

export interface CreateBoardBackgroundProps {
   rowLength?: number;
   colLength?: number;
   boxWidth?: number;
   hover?: boolean;
   onClick?: (...params: any[]) => void;
}

export const CreateBoardBackground: React.FC<CreateBoardBackgroundProps> = ({
   rowLength = 10, colLength = 10, boxWidth = 32, hover,
}) => (
      <>
         {new Array(rowLength).fill(0).map((_, rowIndex) => (
            new Array(colLength).fill(0).map((_, colIndex) => (
               <BoardSquare
                  width={boxWidth}
                  key={colIndex}
                  top={rowIndex * boxWidth}
                  left={colIndex * boxWidth}
                  data-row={rowIndex}
                  data-col={colIndex}
                  hover={hover}
               />
            ))
         ))}
      </>
   );

export interface CreateBoardCharactersProps {
   characters: Array<string | number>;
   top: number;
   left: number;
   increaseBy: 'left' | 'top';
}

export const CreateBoardCharacters: React.FC<CreateBoardCharactersProps> = ({
   characters, top, left, increaseBy,
}) => (
      <BoardCharactersWrapper>
         {characters.map((character, i) => (
            <BoardNameCharacter
               left={increaseBy === 'left' ? i * left : left}
               top={increaseBy === 'top' ? i * top : top}
            >
               {character}
            </BoardNameCharacter>
         ))}
      </BoardCharactersWrapper>
   );
