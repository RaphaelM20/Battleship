import Player from "./player.js";
import { Ship, createShipList } from "./ships.js";
import { renderBoard } from "./dom.js";

let player1 = Player();
let computer = Player(true);
let gameOver = false;

const playerBoardContainer = document.getElementById("player-board");
const computerBoardContainer = document.getElementById("computer-board");

renderBoard(player1.board, playerBoardContainer, false);
renderBoard(computer.board, computerBoardContainer, true);

const gameStatus = document.getElementById("game-status");

let currentShipIndex = 0;

let placingShips = true;
let playerShips = createShipList();

playerBoardContainer.addEventListener("click", (e) => {
  if (!placingShips) return;

  const direction = "horizontal";

  const cell = e.target;
  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);
  const coord = [y, x];

  const placed = player1.board.placeShip(
    playerShips[currentShipIndex],
    coord,
    direction,
  );
  if (placed) {
    currentShipIndex++;
    renderBoard(player1.board, playerBoardContainer, false);
  }
  if (player1.board.placedShips.length === 5) {
    placingShips = false;
  }
});

let computerShips = createShipList();
computer.board.placeShipsRandomly(computerShips); 

computerBoardContainer.addEventListener("click", (e) => {
  if (gameOver || placingShips) return;
  const cell = e.target;
  if (!cell.classList.contains("cell")) return;

  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);

  console.log("Player clicked on: ", y, x);
  const coord = [y, x];

  player1.attack(coord, computer.board);
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

const restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener("click", (e) => {
  player1 = Player();
  computer = Player(true);
  currentShipIndex = 0;
  placingShips = true;
  gameOver= false;
  gameStatus.textContent = "";
  playerShips = createShipList();
  computerShips = createShipList();
  computer.board.placeShipsRandomly(computerShips);
  renderBoard(player1.board, playerBoardContainer, false);
  renderBoard(computer.board, computerBoardContainer, true);
});
