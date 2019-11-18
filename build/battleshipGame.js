"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: triple-equals
const constants_1 = require("./constants");
class BattleshipGame {
    constructor(player1, player2, io) {
        this.playerList = [player1, player2];
        this.roomName = player1.roomName;
        this.currentPlayer = 0;
        this.io = io;
        this.initializeEvents();
        player1.socket.emit(constants_1.BattleshipEvents.OnYourTurn);
    }
    changePlayer() {
        return this.currentPlayer = this.differentPlayer();
    }
    differentPlayer() {
        return this.currentPlayer ? 0 : 1;
    }
    checkHit(x, y) {
        const playerToCheck = this.playerList[this.differentPlayer()];
        if (playerToCheck && playerToCheck.shipsLayout) {
            const hasHit = playerToCheck.shipsLayout.filter(({ x: userX, y: userY, w: userW }) => y === userY && x <= userX + userW - 1 && x >= userX);
            return !!hasHit.length;
        }
        return false;
    }
    checkWin(player) {
        return !player.hitsLeft;
    }
    initializeEvents() {
        this.playerList.forEach((player) => {
            player.socket.on(constants_1.BattleshipEvents.OnAttack, (message) => {
                const currentPlayer = this.playerList[this.currentPlayer];
                const enemyPlayer = this.playerList[this.differentPlayer()];
                if (player.socket != currentPlayer.socket) {
                    return;
                }
                if (this.checkHit(message.x, message.y)) {
                    enemyPlayer.hitsLeft--;
                    enemyPlayer.socket.emit(constants_1.BattleshipEvents.OnReceiveAttack, message);
                    currentPlayer.socket.emit(constants_1.BattleshipEvents.OnYourTurn);
                }
                else {
                    enemyPlayer.socket.emit(constants_1.BattleshipEvents.OnReceiveAttack, message);
                    enemyPlayer.socket.emit(constants_1.BattleshipEvents.OnYourTurn);
                    this.changePlayer();
                }
                if (this.checkWin(enemyPlayer)) {
                    this.io.to(player.roomName).emit(constants_1.BattleshipEvents.OnWin, {
                        winner: { id: currentPlayer.clientId, name: currentPlayer.userName },
                    });
                }
            });
        });
    }
}
exports.BattleshipGame = BattleshipGame;
