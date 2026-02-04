import Player from "./player.js";
import Ship from "./ships.js";
import { renderBoard } from "./dom.js";

const player1 = Player();
const computer = Player(true);
let gameOver = false;

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

const gameStatus = document.getElementById("game-status");

computerBoardContainer.addEventListener("click", (e) => {
  if (gameOver) return;
  const cell = e.target;
  if (!cell.classList.contains("cell")) return;

  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);

  console.log("Player clicked on: ", y, x);
  const coord = [y, x];
  const key = coord.toString();

  player1.attack(key, computer.board);
  renderBoard(computer.board, computerBoardContainer, true);
  if (computer.board.allShipsSunk()) {
    gameStatus.textContent = "You Win!";
    gameOver = true;
  }

  computer.randomAttack(player1.board);
  renderBoard(player1.board, playerBoardContainer, false);
  if (player1.board.allShipsSunk()) {
    gameStatus.textContent = "Computer Wins!";
    gameOver = true;
  }
});

