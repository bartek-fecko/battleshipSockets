export enum BoardDimensions {
   BoardWidth = 320,
   BoardHeight = 320,
   BoxWidth = 32,
}

export const colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const rowNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type ReactGridKey = string;

export interface ReactGridLayout {
   i: ReactGridKey;
   x: number;
   y: number;
   w: number;
   h: number;
   minw?: number;
   maxW?: number;
   minH?: number;
   maxH?: number;
}

export interface OnRecieveAttackMsg {
   x: number;
   y: number;
}

export interface OnWin {
   winner: {
      id: string;
      name: string;
   };
}

export interface OnSuccessfulHit {
   x: number;
   y: number;
}

export const notReadyToPlayMessage = 'To start game, arrange your ships and press start button.';

export enum BattleshipEvents {
   OnAttack = 'OnAttack',
   OnReceiveAttack = 'OnReceiveAttack',
   OnYourTurn = 'OnYourTurn',
   OnPlayerReady = 'OnPlayerReady',
   OnWin = 'OnWin',
   onSuccessfulHit = 'onSuccessfulHit',
}

export const shipsInitialLayout = [
   { x: 0, y: 0, w: 1, h: 1, i: 'short-a' },
   { x: 0, y: 2, w: 1, h: 1, i: 'short-b' },
   { x: 0, y: 4, w: 3, h: 1, i: 'medium-a' },
   { x: 0, y: 6, w: 3, h: 1, i: 'medium-b' },
   { x: 0, y: 8, w: 5, h: 1, i: 'long' },
];
