export interface Socket {
   emit: (messageId: string, message: any) => void;
   [key: string]: any;
}
