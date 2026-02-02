import Gameboard from "./gameboard.js";

export default function Player(isComputer = false) {
  const board = Gameboard();
  const randomMoves = new Set();

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
    enemyBoard.receiveAttack(coord);
  }

  function getMoves() {
    return Array.from(randomMoves);
  }

  return {
    board,
    attack,
    randomAttack,
    getMoves
  };
}
