export interface Socket {
   id: string;
   emit: (messageId: string, message?: any) => void;
   on: (messageId: string, cb: (message?: any) => void) => void;
   join: (roomName: string) => void;
   to: (roomName: string) => Socket;
   [key: string]: any;
}

export interface Player {
   isWaiting: boolean;
   socket: Socket;
   userName?: string;
   roomName?: string;
   id: string;
   hitsLeft: number;
   clientId?: string;
   shipsLayout?: UserShipsLayout[];
}

export interface Players {
   [id: string]: Player;
}

export interface AttackEventMessage {
   x: number;
   y: number;
}

export interface Message {
   userName: string;
   message: string;
}

export enum BattleshipEvents {
   OnAttack = 'OnAttack',
   OnReceiveAttack = 'OnReceiveAttack',
   OnYourTurn = 'OnYourTurn',
   OnPlayerReady = 'OnPlayerReady',
   OnWin = 'OnWin',
   onSuccessfulHit = 'onSuccessfulHit',
}

export interface UserShipsLayout {
   i: string;
   x: number;
   y: number;
   w: number;
   h: number;
   minw: number;
   maxW: number;
   minH: number;
   maxH: number;
}

export const numberOfShipPoints = 13;
