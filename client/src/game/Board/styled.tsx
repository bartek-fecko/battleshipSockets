import * as GridLayout from 'react-grid-layout';
import styled from 'styled-components';
import * as C from './constants';

export const Boards = styled.div`
   display: flex;
   flex-direction: column;
   margin: 10px 20px;
   & > * {
      margin: 8px 8px;
   }
   @media screen and (min-width: ${C.BoardDimensions.BoardWidth * 2 + 120}px){
      flex-direction: row;
      padding: 60px;
      margin: 16px;
   }
`;

export const BoardWrapper = styled.div`
   display: flex;
   padding: 0 30px 30px 10px;
`;

export const BoardGridWrapper = styled.div`
   position: relative;
   width: ${C.BoardDimensions.BoardWidth}px;
   height: ${C.BoardDimensions.BoardHeight}px;
`;

export const PlayerBoardGrid = styled(BoardGridWrapper)``;

export const EnemyPlayerBoardGrid = styled(BoardGridWrapper)``;

export const BoardGridLayout = styled(GridLayout)`
   width: ${C.BoardDimensions.BoardWidth}px;
   height: ${C.BoardDimensions.BoardHeight}px !important;
   border: 1px solid #eee;
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

export const Box = styled.div`
   background-color: orange;
   &:hover {
      cursor: grab;
   }
   & span {
      display: none;
   }
`;

export const BoardSquare = styled.span<{ width: number, top: number, left: number }>`
   width: ${({ width }) => width}px;
   height: ${({ width }) => width}px;
   top: ${({ top }) => top}px;
   left: ${({ left }) => left}px;
   background-color: white;
   border: 0.5px solid #eee;
   position: absolute;
   z-index: -1;
`;
