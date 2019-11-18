"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BattleshipEvents;
(function (BattleshipEvents) {
    BattleshipEvents["OnAttack"] = "OnAttack";
    BattleshipEvents["OnReceiveAttack"] = "OnReceiveAttack";
    BattleshipEvents["OnYourTurn"] = "OnYourTurn";
    BattleshipEvents["OnPlayerReady"] = "OnPlayerReady";
    BattleshipEvents["OnWin"] = "OnWin";
})(BattleshipEvents = exports.BattleshipEvents || (exports.BattleshipEvents = {}));
exports.numberOfShipPoints = 13;
