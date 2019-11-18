import {
   BoardDimensions,
   colNames,
   ReactGridLayout,
   rowNames,
   shipsInitialLayout,
} from '#/game/Board/constants';
import { BoardGridLayout, BoardWrapper, Box } from '#/game/Board/styled';
import * as React from 'react';
import 'react-grid-layout/css/styles.css';
import { CreateBoardBackground, CreateBoardCharacters } from '../BoardHelpers';
import BoardTools from '../BoardTools';
import { PlayerBoardGrid } from './styled';

let lastElementPositionTransform: string;

const onDrop = (
   layout: ReactGridLayout[],
   oldItem: ReactGridLayout,
   newItem: ReactGridLayout,
   placeholder: any,
   e: MouseEvent,
   elem: HTMLElement,
) => {
   if (newItem.y + newItem.h > rowNames.length) {
      elem.style.transform = lastElementPositionTransform;
   }
};

const onDragStart = (
   layout: ReactGridLayout[],
   oldItem: ReactGridLayout,
   newItem: ReactGridLayout,
   placeholder: any,
   e: MouseEvent,
   elem: HTMLElement,
) => {
   lastElementPositionTransform = elem.style.transform;
};

interface PlayerBoardProps {
   readyToPlay: boolean;
   shipsLayout: ReactGridLayout[];
   onLayoutChange: (layout: ReactGridLayout[]) => any;
   startGameHandler: () => void;
   getLayoutFromLocalStorage: () => ReactGridLayout[] | null;
   ref: React.Ref<any>;
}

const PlayerBoard: React.FC<PlayerBoardProps> = React.forwardRef((
   {
      readyToPlay,
      shipsLayout,
      onLayoutChange,
      startGameHandler,
      getLayoutFromLocalStorage,
   },
   ref) => {
   return (
      <BoardWrapper ref={ref}>
         <CreateBoardCharacters
            characters={rowNames}
            top={BoardDimensions.BoxWidth + BoardDimensions.BoxWidth / 2 - 15}
            left={-30}
            increaseBy="top"
         />
         <div>
            <CreateBoardCharacters
               characters={colNames}
               left={BoardDimensions.BoxWidth + BoardDimensions.BoxWidth / 2 - 15}
               top={-30}
               increaseBy="left"
            />
            <PlayerBoardGrid inactive={readyToPlay}>
               <BoardGridLayout
                  className="layout"
                  layout={shipsLayout || getLayoutFromLocalStorage() || shipsInitialLayout}
                  compactType={null}
                  preventCollision
                  cols={colNames.length}
                  rowHeight={BoardDimensions.BoxWidth}
                  width={BoardDimensions.BoardWidth}
                  margin={[0, 0]}
                  maxRows={300}
                  onDragStop={onDrop}
                  onDragStart={onDragStart}
                  onLayoutChange={onLayoutChange}
               >
                  {shipsInitialLayout.map(({ i }) => <Box key={i} />)}
               </BoardGridLayout>
               <CreateBoardBackground />
            </PlayerBoardGrid>
            <BoardTools
               onStartGame={startGameHandler}
               readyToPlay={readyToPlay}
            />
         </div>
      </BoardWrapper>
   );
});

export default PlayerBoard;
