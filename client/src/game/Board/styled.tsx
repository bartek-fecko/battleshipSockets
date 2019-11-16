import * as GridLayout from 'react-grid-layout';
import styled, { keyframes } from 'styled-components';
import * as C from './constants';

export const Boards = styled.div<{ readyToPlay: boolean }>`
   display: flex;
   flex-direction: ${({ readyToPlay }) => readyToPlay ? 'column-reverse' : 'column'};;
   margin: 10px 20px;
   & > * {
      margin: 8px 8px;
   }
   @media screen and (min-width: ${C.BoardDimensions.BoardWidth * 2 + 120}px) {
      flex-direction: ${({ readyToPlay }) => readyToPlay ? 'row-reverse' : 'row'};
      padding-left: 25px;
      margin: 16px;
   }
`;

export const BoardWrapper = styled.div`
   padding: 0 30px 30px 10px;
`;

export const BoardGridWrapper = styled.div`
   position: relative;
   width: ${C.BoardDimensions.BoardWidth}px;
   height: ${C.BoardDimensions.BoardHeight}px;
`;

export const PlayerBoardGrid = styled(BoardGridWrapper) <{ inactive: boolean }>`
   z-index: ${({ inactive }) => inactive ? '-1' : '1'};
`;

export const EnemyPlayerBoardGrid = styled(BoardGridWrapper)<{ readyToPlay?: boolean }>`
   &:after {
      content: "${C.notReadyToPlayMessage}";
      position: absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      display: ${({ readyToPlay }) => readyToPlay ? 'none' : 'block'};
   }
`;

export const BoardGridLayout = styled(GridLayout)`
   width: ${C.BoardDimensions.BoardWidth}px;
   height: ${C.BoardDimensions.BoardHeight}px !important;
`;

export const BoardCharactersWrapper = styled.div`
   position: relative;
   font-size: 0.8em;
   height: 1px;
`;

export const BoardNameCharacter = styled.span<{ left: number, top: number }>`
   position: absolute;
   left: ${({ left }) => left}px;
   top: ${({ top }) => top}px;
   z-index: 10;
`;

export const BoardToolsWrapper = styled.div`
   display: flex;
   margin-top: 8px;
`;

export const increase = keyframes`
   0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
   }
   100% {
      transform: scale(1.25);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
   }
`;

export const BoardToolsButton = styled.button`
   padding: 8px 16px;
   font-size: 0.8em;
   border: 1px solid #eee;
   background: white;
   cursor: pointer;
   outline: none;
   &:hover {
      background: #eee;
      animation: ${increase} 0.5s forwards;
   }
`;

export const StartGameButton = styled(BoardToolsButton)<{ readyToPlay: boolean }>`
   border: 1px solid green;
   color: green;
   display: ${({ readyToPlay }) => readyToPlay ? 'none' : 'block'};
   &:hover {
      background: white;
   }
`;

export const Box = styled.div`
   background-color: orange;
   &:hover {
      cursor: grab;
   }
   & span {
      display: none;
   }
`;

export interface BoardSquareProps {
   width: number,
   top: number,
   left: number,
   hover?: boolean
}

export const BoardSquare = styled.span<BoardSquareProps>`
   cursor: ${({ hover }) => hover && 'pointer'};
   width: ${({ width }) => width}px;
   height: ${({ width }) => width}px;
   top: ${({ top }) => top}px;
   left: ${({ left }) => left}px;
   background-color: white;
   border: 0.2px solid #eee;
   position: absolute;
   z-index: ${({ hover }) => hover ? '1' : '-1'};
`;

export const TurnInformation = styled.div`
   font-size: 0.8em;
   margin: 8px 0;
`;

export const MyTurn = styled(TurnInformation)`
   color: green;
`;

export const EnemyTurn = styled(TurnInformation)`
   color: red;
`;
