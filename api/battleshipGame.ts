// tslint:disable: triple-equals
import { AttackEventMessage, BattleshipEvents, Player, Socket } from './constants';

export class BattleshipGame {
   private playerList: [Player, Player];
   private currentPlayer: 0 | 1;
   private io: Socket;
   private roomName: string;

   constructor(player1: Player, player2: Player, io) {
      this.playerList = [player1, player2];
      this.roomName = player1.roomName as string;
      this.currentPlayer = 0;
      this.io = io;
      this.initializeEvents();
      player2.socket.emit(BattleshipEvents.YourTurn);
   }

   public changePlayer() {
      return this.currentPlayer = this.currentPlayer ? 0 : 1;
   }

   private initializeEvents() {
      this.playerList.forEach((player) => {
         player.socket.on(BattleshipEvents.OnAttack, (message: AttackEventMessage) => {
            const currentPlayer = this.playerList[this.currentPlayer];
            if (player.socket == currentPlayer.socket) {
               return;
            }
            this.changePlayer();
            currentPlayer.socket.emit(BattleshipEvents.OnReceiveAttack, message);
            currentPlayer.socket.emit(BattleshipEvents.YourTurn);
         });
      });
   }

}
