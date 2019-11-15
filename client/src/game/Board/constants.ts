export enum BoardDimensions {
   BoardWidth = 320,
   BoardHeight = 320,
   BoxWidth = 32,
}

export const colNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const rowNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export interface ReactGridLayout {
   x: number;
   y: number;
   w: number;
   h: number;
   minw: number;
   maxW: number;
   minH: number;
   maxH: number;
}

export const notReadyToPlayMessage = 'To start game, arrange your ships and press start button.';
