import { BoardDimensions } from '#/modules/Game/Board/constants';

export const pickerWidth = 250;
export const displayAllGameItems = BoardDimensions.BoardWidth * 3 + 180;

export interface Message {
   userName: string;
   message: string;
   date: string;
}
