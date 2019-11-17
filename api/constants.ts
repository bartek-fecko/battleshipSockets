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
   userName: string;
   roomName?: string;
   id: string;
   shipsLayout?: UserShipsLayout[];
}

export interface Players {
   [id: string]: Player;
}

export interface AttackEventMessage {
   x: number;
   y: number;
}

export enum BattleshipEvents {
   OnAttack = 'OnAttack',
   OnReceiveAttack = 'OnReceiveAttack',
   YourTurn = 'YourTurn',
   PlayerReady = 'PlayerReady',
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
