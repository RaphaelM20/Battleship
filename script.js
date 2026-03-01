import Player from "./player.js";
import { Ship, createShipList } from "./ships.js";
import { renderBoard } from "./dom.js";

const welcomeScreen = document.getElementById("welcome-screen");
const gameContainer = document.getElementById("game-container");
const startGameBtn = document.getElementById("start-game-btn");
const playerNameInput = document.getElementById("player-name");

startGameBtn.addEventListener("click", () => {
  const playerName = playerNameInput.value;

  if (playerName === "") {
    alert("Please enter your name, Captain");
    return;
  }

  welcomeScreen.style.display = "none";
  gameContainer.style.display = "block";

  const playerInstructions = document.getElementById("player-instructions");
  playerInstructions.innerHTML = `${playerName}, PLACE YOUR ${playerShips[currentShipIndex].name.toUpperCase()}`;
});

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

let direction = "X";
const toggleDirection = document.getElementById("change-direction-btn");
toggleDirection.innerHTML = `AXIS: ${direction}`;

toggleDirection.addEventListener("click", () => {
  direction = direction === "X" ? "Y" : "X";
  toggleDirection.innerHTML = `AXIS: ${direction}`;
});

playerBoardContainer.addEventListener("mouseover", (e) => {
  if (!placingShips) return;
  
  const cell = e.target;
  if (!cell.classList.contains("cell")) return;
  
  document.querySelectorAll(".preview, .preview-invalid").forEach(c => {
    c.classList.remove("preview", "preview-invalid");
  });
  
  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);
  const ship = playerShips[currentShipIndex];

  const cellsToHighlight = [];
  let isValid = true;
  
  if (direction === "X") {
    for (let i = 0; i < ship.length; i++) {
      const newX = x + i;
      if (newX > 9) {
        isValid = false;
        break;
      }
      const key = `${y},${newX}`;
      if (player1.board.shipPositions.has(key)) {
        isValid = false;
      }
      cellsToHighlight.push([y, newX]);
    }
  } else {
    for (let i = 0; i < ship.length; i++) {
      const newY = y + i;
      if (newY > 9) {
        isValid = false;
        break;
      }
      const key = `${newY},${x}`;
      if (player1.board.shipPositions.has(key)) {
        isValid = false;
      }
      cellsToHighlight.push([newY, x]);
    }
  }
  
  cellsToHighlight.forEach(([cellY, cellX]) => {
    const cellToHighlight = playerBoardContainer.querySelector(`[data-x="${cellX}"][data-y="${cellY}"]`);
    if (cellToHighlight) {
      cellToHighlight.classList.add(isValid ? "preview" : "preview-invalid");
    }
  });
});

playerBoardContainer.addEventListener("mouseleave", () => {
  document.querySelectorAll(".preview, .preview-invalid").forEach(c => {
    c.classList.remove("preview", "preview-invalid");
  });
});

playerBoardContainer.addEventListener("click", (e) => {
  if (!placingShips) return;

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

    const playerInstructions = document.getElementById("player-instructions");
    if (currentShipIndex < playerShips.length) {
      playerInstructions.innerHTML = `${playerNameInput.value}, PLACE YOUR ${playerShips[currentShipIndex].name.toUpperCase()}`;
    }
    else {
      playerInstructions.innerHTML = "ALL SHIPS PLACED! ATTACK THE ENEMY";
    }
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

  if (cell.classList.contains("hit") || cell.classList.contains("miss")) {
    return;
  }

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

  computer.computerTurn(player1.board);
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
  gameOver = false;
  gameStatus.textContent = "";
  playerShips = createShipList();
  computerShips = createShipList();
  computer.board.placeShipsRandomly(computerShips);

  playerNameInput.value = "";

  gameContainer.style.display = "none";
  welcomeScreen.style.display = "block";
  
  renderBoard(player1.board, playerBoardContainer, false);
  renderBoard(computer.board, computerBoardContainer, true);
});
