import Player from "./player.js";
import Ship from "./ships.js";
import { renderBoard } from './dom.js';

const player1 = Player();
const computer = Player(true);

player1.board.placeShip(Ship(3), [0, 0], "horizontal");
player1.board.placeShip(Ship(2), [2, 2], "vertical");
player1.board.placeShip(Ship(1), [5, 5], "horizontal");

computer.board.placeShip(Ship(3), [1, 1], "horizontal");
computer.board.placeShip(Ship(2), [4, 4], "vertical");
computer.board.placeShip(Ship(1), [7, 7], "horizontal");

const playerBoardContainer = document.getElementById("player-board");
const computerBoardContainer = document.getElementById("computer-board");

renderBoard(player1.board, playerBoardContainer, false);
renderBoard(computer.board, computerBoardContainer, true);