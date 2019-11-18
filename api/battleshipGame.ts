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
      player1.socket.emit(BattleshipEvents.OnYourTurn);
   }

   public changePlayer() {
      return this.currentPlayer = this.differentPlayer();
   }

   public differentPlayer() {
      return this.currentPlayer ? 0 : 1;
   }

   public checkHit(x: number, y: number): boolean {
      const playerToCheck = this.playerList[this.differentPlayer()];
      if (playerToCheck && playerToCheck.shipsLayout) {
         const hasHit: any[] = playerToCheck.shipsLayout.filter((
            { x: userX, y: userY, w: userW }) => y === userY && x <= userX + userW - 1 && x >= userX,
         );
         return !!hasHit.length;
      }
      return false;
   }

   public checkWin(player: Player) {
      return !player.hitsLeft;
   }

   private initializeEvents() {
      this.playerList.forEach((player) => {
         player.socket.on(BattleshipEvents.OnAttack, (message: AttackEventMessage) => {
            const currentPlayer = this.playerList[this.currentPlayer];
            const enemyPlayer = this.playerList[this.differentPlayer()];

            if (player.socket != currentPlayer.socket) {
               return;
            }

            if (this.checkHit(message.x, message.y)) {
               enemyPlayer.hitsLeft--;
               enemyPlayer.socket.emit(BattleshipEvents.OnReceiveAttack, message);
               currentPlayer.socket.emit(BattleshipEvents.OnYourTurn);
            } else {
               enemyPlayer.socket.emit(BattleshipEvents.OnReceiveAttack, message);
               enemyPlayer.socket.emit(BattleshipEvents.OnYourTurn);
               this.changePlayer();
            }

            if (this.checkWin(enemyPlayer)) {
               this.io.to(player.roomName as string).emit(BattleshipEvents.OnWin, {
                  winner: { id: currentPlayer.clientId, name: currentPlayer.userName },
               });
            }
         });
      });
   }

}
