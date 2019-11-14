import * as React from 'react';
import 'react-grid-layout/css/styles.css';
import * as io from 'socket.io-client';
import { CreateBoardBackground, CreateBoardCharacters } from './BoardHelpers';
import * as C from './constants';
import {
   BoardGridLayout,
   Boards,
   BoardWrapper,
   Box,
   EnemyPlayerBoardGrid,
   PlayerBoardGrid,
} from './styled';

const Board: React.FC = () => {
   let lastElementPositionTransform: string;
   const onDrop = (
      layout: C.ReactGridLayout[],
      oldItem: C.ReactGridLayout,
      newItem: C.ReactGridLayout,
      placeholder: any,
      e: MouseEvent,
      elem: HTMLElement,
   ) => {
      if (newItem.y + newItem.h > C.rowNames.length) {
         elem.style.transform = lastElementPositionTransform;
      }
   };

   const onDragStart = (
      layout: C.ReactGridLayout[],
      oldItem: C.ReactGridLayout,
      newItem: C.ReactGridLayout,
      placeholder: any,
      e: MouseEvent,
      elem: HTMLElement,
   ) => {
      lastElementPositionTransform = elem.style.transform;
   };

   const gridLayout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 1, maxW: 1, maxH: 1 },
      { i: 'b', x: 0, y: 6, w: 4, h: 1 },
   ];
   const onClick = (e) => {
      console.log(e.target.dataset.test);
   };

   const onLayoutChange = (layout) => {
      // console.log(layout)
   };

   return (
      <Boards>
         <BoardWrapper>
            <CreateBoardCharacters
               characters={C.rowNames}
               top={C.BoardDimensions.BoxWidth + C.BoardDimensions.BoxWidth / 2 - 15}
               left={-30}
               increaseBy="top"
            />
            <div>
               <CreateBoardCharacters
                  characters={C.colNames}
                  left={C.BoardDimensions.BoxWidth + C.BoardDimensions.BoxWidth / 2 - 15}
                  top={-30}
                  increaseBy="left"
               />
               <PlayerBoardGrid>
                  <BoardGridLayout
                     className="layout"
                     // layout={gridLayout}
                     compactType={null}
                     preventCollision
                     cols={C.colNames.length}
                     rowHeight={C.BoardDimensions.BoxWidth}
                     width={C.BoardDimensions.BoardWidth}
                     margin={[0, 0]}
                     maxRows={300}
                     onDragStop={onDrop}
                     onDragStart={onDragStart}
                     onLayoutChange={onLayoutChange}
                  >
                     <Box key="a" data-grid={{ i: 'a', x: 0, y: 0, w: 1, h: 1, maxW: 1, maxH: 1 }} onClick={onClick} />
                     <Box key="b" data-grid={{ i: 'a', x: 6, y: 2, w: 4, h: 2, maxW: 1, maxH: 1 }} onClick={onClick} />
                     <Box key="c" data-grid={{ i: 'a', x: 4, y: 2, w: 2, h: 2, maxW: 2, maxH: 2 }} onClick={onClick} />

                  </BoardGridLayout>
                  <CreateBoardBackground />
               </PlayerBoardGrid>
            </div>
         </BoardWrapper>
         <BoardWrapper>
            <CreateBoardCharacters
               characters={C.rowNames}
               top={C.BoardDimensions.BoxWidth + C.BoardDimensions.BoxWidth / 2 - 15}
               left={-30}
               increaseBy="top"
            />
            <EnemyPlayerBoardGrid>
               <CreateBoardCharacters
                  characters={C.colNames}
                  left={C.BoardDimensions.BoxWidth + C.BoardDimensions.BoxWidth / 2 - 15}
                  top={-30}
                  increaseBy="left"
               />
               <CreateBoardBackground />
            </EnemyPlayerBoardGrid>
         </BoardWrapper>
      </Boards>
   );
};

export default Board;
