import { Socket } from './constants';

export class BattleshipGame {
   private playerList: [Socket, Socket];
   private currentPlayer: number;

   constructor(player1: Socket, player2: Socket) {
      this.playerList = [player1, player2];
      this.currentPlayer = 0;
   }

   public notifyPlayers(message: string) {
      this.playerList.forEach((player) => {
         player.emit('message', message);
      });
   }

   public getCurrentPlayerId = (): number => this.currentPlayer;

   public changePlayer() {
      return this.currentPlayer = this.currentPlayer ? 0 : 1;
   }

   public sendTo(playerIndex: number, message: string) {
      this.playerList[playerIndex].emit('message', message);
   }
}
