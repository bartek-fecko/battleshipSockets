"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BattleshipGame {
    constructor(player1, player2, io) {
        this.getCurrentPlayerId = () => this.currentPlayer;
        this.playerList = [player1, player2];
        this.currentPlayer = 0;
        this.io = io;
        this.initializeEvents();
    }
    changePlayer() {
        return this.currentPlayer = this.currentPlayer ? 0 : 1;
    }
    sendTo(playerIndex, message) {
        this.playerList[playerIndex].socket.emit('message', message);
    }
    initializeEvents() {
        this.playerList.forEach((player) => {
            player.socket.on('onAttack', (message) => {
                this.changePlayer();
                console.log(message, player.id);
                // this.io.emit('afterAttack', )
            });
            player.socket.on('onReceiveAttack', () => {
            });
        });
    }
}
exports.BattleshipGame = BattleshipGame;
