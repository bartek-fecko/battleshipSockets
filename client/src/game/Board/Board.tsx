import { appVariables } from '#/config/appConstants';
import * as React from 'react';
import 'react-grid-layout/css/styles.css';
import { CreateBoardBackground, CreateBoardCharacters } from './BoardHelpers';
import BoardTools from './BoardTools';
import * as C from './constants';
import {
   BoardGridLayout,
   Boards,
   BoardWrapper,
   Box,
   EnemyPlayerBoardGrid,
   EnemyTurn,
   MyTurn,
   PlayerBoardGrid,
} from './styled';

const Board: React.FC = () => {
   const [readyToPlay, setReadyToPlay] = React.useState(false);
   const [myTurn, setMyTurn] = React.useState(true);
   const [shipsLayout, setShipsLayout] = React.useState<C.ReactGridLayout[]>();
   const socket = appVariables.socket;
   const playerBoardRef = React.useRef<HTMLDivElement>();
   const enemyBoardRef = React.useRef<HTMLDivElement>();

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

   const startGameHandler = () => {
      setReadyToPlay(true);
      setMyTurn(false);
      socket.emit(C.BattleshipEvents.PlayerReady, shipsLayout);
   };

   const onFieldClick = (e: React.MouseEvent<HTMLElement>) => {
      const x = Number((e.target as HTMLElement).dataset.col);
      const y = Number((e.target as HTMLElement).dataset.row);
      if (myTurn) {
         socket.emit(C.BattleshipEvents.OnAttack, { x, y });
         if (enemyBoardRef) {
            const row = enemyBoardRef.current.querySelectorAll(`[data-row="${y}"]`);
            const target = row[x] as HTMLElement;
            target.style.background = 'red';
         }
         setMyTurn(false);
      }
   };

   socket.on(C.BattleshipEvents.YourTurn, () => {
      setMyTurn(true);
   });

   socket.on(C.BattleshipEvents.OnReceiveAttack, (message: C.OnRecieveAttackMsg) => {
      if (message && playerBoardRef) {
         const row = playerBoardRef.current.querySelectorAll(`[data-row="${message.y}"]`);
         const target = row[message.x] as HTMLElement;
         (target.style as unknown as string) = 'background: red; z-index: 1';
      }
   });

   const getLayoutFromLocalStorage = (): C.ReactGridLayout[] | null => {
      if (localStorage.getItem('layout') !== null) {
         const layout = JSON.parse(localStorage.getItem('layout'));
         setShipsLayout(layout);
         return layout;
      }
      return null;
   };

   const onLayoutChange = (layout: C.ReactGridLayout[]) => {
      localStorage.setItem('layout', JSON.stringify(layout));
   };

   return (
      <Boards readyToPlay={readyToPlay}>
         <BoardWrapper ref={playerBoardRef}>
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
               <PlayerBoardGrid inactive={readyToPlay}>
                  <BoardGridLayout
                     className="layout"
                     layout={shipsLayout || getLayoutFromLocalStorage()}
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
                     <Box key="a" />
                     <Box key="b" />
                     <Box key="c" />
                  </BoardGridLayout>
                  <CreateBoardBackground />
               </PlayerBoardGrid>
               <BoardTools
                  onStartGame={startGameHandler}
                  readyToPlay={readyToPlay}
               />
            </div>
         </BoardWrapper>
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
               <CreateBoardBackground
                  hover
                  onFieldClick={onFieldClick}
               />
            </EnemyPlayerBoardGrid>
            {myTurn ? <MyTurn>My Turn</MyTurn> : <EnemyTurn>Enemy Turn</EnemyTurn>}
         </BoardWrapper>
      </Boards>
   );
};

export default Board;
