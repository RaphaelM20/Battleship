import Gameboard from "./gameboard.js";
import { Ship } from "./ships.js";

export default function Player(isComputer = false) {
  const board = Gameboard();
  const randomMoves = new Set();
  let isHuntMode = false;
  let originalHit = null;
  let currentDirection = null;
  let currentIndex = 0;
  let currentCoord = null;
  let directionsToTry = ["up", "down", "left", "right"];

  function attack(coord, enemyBoard) {
    enemyBoard.receiveAttack(coord);
  }

  function randomAttack(enemyBoard) {
    let coord, key;

    do {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      coord = [x, y];
      key = coord.toString();
    } while (randomMoves.has(key));

    randomMoves.add(key);
    const result = enemyBoard.receiveAttack(key);

    if (result === "hit") {
      isHuntMode = true;
      originalHit = coord;
      currentCoord = coord;
      directionsToTry = ["up", "down", "left", "right"];
    }
  }

  function huntAttack(enemyBoard) {
    currentDirection = directionsToTry[currentIndex];
    let newCoord;

    if (currentDirection === "up") {
      newCoord = [currentCoord[0] - 1, currentCoord[1]];;
    } else if (currentDirection === "down") {
      newCoord = [currentCoord[0] + 1, currentCoord[1]];
    } else if (currentDirection === "left") {
      newCoord = [currentCoord[0], currentCoord[1] - 1];
    } else if (currentDirection === "right") {
      newCoord = [currentCoord[0], currentCoord[1] + 1];
    }

    if (newCoord[0] > 9 || newCoord[0] < 0 || newCoord[1] > 9 || newCoord[1] < 0) {
      currentCoord = originalHit;
      currentIndex++;
      huntAttack(enemyBoard);
      return;
    } 

    const key = newCoord.toString();
    const result = enemyBoard.receiveAttack(key);

    if (result === "hit") {
      currentCoord = newCoord;
    }else if (result === "miss") {
      currentCoord = originalHit;
      currentIndex++;
    }else if (result === "sunk") {
      isHuntMode = false;
      currentCoord = null;
      currentIndex = 0;
      directionsToTry = ["up", "down", "left", "right"];
    }
  }

  function computerTurn(enemyBoard) {
    if (isHuntMode) {
      huntAttack(enemyBoard);
    }
    else {
      randomAttack(enemyBoard);
    }
  }

  function getMoves() {
    return Array.from(randomMoves);
  }

  return {
    board,
    attack,
    computerTurn,
    getMoves
  };
}