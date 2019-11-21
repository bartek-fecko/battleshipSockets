import { appVariables } from '#/config/appConstants';
import WinnerModal from '#/modules/WinnerModal/WinnerModal';
import * as React from 'react';
import 'react-grid-layout/css/styles.css';
import {
   BattleshipEvents,
   OnRecieveAttackMsg,
   OnSuccessfulHit,
   OnWin,
   ReactGridLayout,
} from './constants';
import EnemyBoard from './EnemyBoard/EnemyBoard';
import PlayerBoard from './PlayerBoard/PlayerBoard';
import {
   Boards,
} from './styled';

const Board: React.FC = () => {
   const [readyToPlay, setReadyToPlay] = React.useState(false);
   const [myTurn, setMyTurn] = React.useState(true);
   const [winnerInfo, setWinnerInfo] = React.useState<{ isWinner: boolean, winnerText: string }>();
   const [shipsLayout, setShipsLayout] = React.useState<ReactGridLayout[]>();
   const socket = appVariables.socket;
   const playerBoardRef = React.useRef<HTMLDivElement>();
   const enemyBoardRef = React.useRef<HTMLDivElement>();

   const startGameHandler = () => {
      setReadyToPlay(true);
      setMyTurn(false);
      socket.emit(BattleshipEvents.OnPlayerReady, shipsLayout);
   };

   const getField = (x: number, y: number, board: HTMLElement) => (
      board.querySelectorAll(`[data-row="${y}"]`)[x]
   );

   const onFieldClick = (e: React.MouseEvent<HTMLElement>) => {
      const x = Number((e.target as HTMLElement).dataset.col);
      const y = Number((e.target as HTMLElement).dataset.row);
      if (myTurn) {
         socket.emit(BattleshipEvents.OnAttack, { x, y });
         if (enemyBoardRef) {
            const target = getField(x, y, enemyBoardRef.current) as HTMLElement;
            if (target.dataset.wasClicked) {
               return;
            }
            target.dataset.wasClicked = 'true';
            target.style.background = '#eee';
            target.style.cursor = 'auto';
            setMyTurn(false);
         }
      }
   };

   socket.on(BattleshipEvents.onSuccessfulHit, ({ x, y }: OnSuccessfulHit) => {
      const target = getField(x, y, enemyBoardRef.current) as HTMLElement;
      (target.style as unknown as string) = 'background: red;';
   });

   socket.on(BattleshipEvents.OnYourTurn, () => {
      setMyTurn(true);
   });

   socket.on(BattleshipEvents.OnReceiveAttack, (message: OnRecieveAttackMsg) => {
      if (message && playerBoardRef) {
         const target = getField(message.x, message.y, playerBoardRef.current) as HTMLElement;
         (target.style as unknown as string) = 'background: red; z-index: 1';
      }
   });

   socket.on(BattleshipEvents.OnWin, ({ winner: { id, name } }: OnWin) => {
      const winnerText = socket.id === id
         ? `Congratullation ${name}. You've won a match.`
         : `Sorry, You lost, the winner of this match is ${name}`;
      setWinnerInfo({ isWinner: true, winnerText });
   });

   const getLayoutFromLocalStorage = (): ReactGridLayout[] | null => {
      if (localStorage.getItem('layout') !== null) {
         const layout = JSON.parse(localStorage.getItem('layout'));
         return layout;
      }
      return null;
   };

   const onLayoutChange = (layout: ReactGridLayout[]) => {
      localStorage.setItem('layout', JSON.stringify(layout));
      setShipsLayout(layout);
   };

   return (
      <Boards readyToPlay={readyToPlay}>
         {winnerInfo && winnerInfo.isWinner && (
            <WinnerModal isWinner={winnerInfo.isWinner}>{winnerInfo.winnerText}</WinnerModal>
         )}
         <PlayerBoard
            ref={playerBoardRef}
            readyToPlay={readyToPlay}
            onLayoutChange={onLayoutChange}
            startGameHandler={startGameHandler}
            shipsLayout={shipsLayout}
            getLayoutFromLocalStorage={getLayoutFromLocalStorage}
         />
         <EnemyBoard
            myTurn={myTurn}
            readyToPlay={readyToPlay}
            onFieldClick={onFieldClick}
            ref={enemyBoardRef}
         />
      </Boards>
   );
};

export default Board;
