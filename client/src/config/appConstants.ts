import { socketConfig } from './socketConfig';

export interface Socket {
   id: string;
   emit: (messageId: string, message?: any) => void;
   on: (messageId: string, message?: any) => void;
   join: (roomName: string) => void;
   to: (roomName: string) => Socket;
   [key: string]: any;
}

export interface AppVariables {
   socket: Socket;
}

export const appVariables: AppVariables = {
   ...socketConfig,
};
