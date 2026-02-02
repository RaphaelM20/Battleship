import { EXPORTDECLARATION_TYPES } from "@babel/types";
import Player from './player.js';
import Gameboard from './gameboard.js';
import Ship from './ships.js';

test("battleship exists and has length", () => {
  const ship = Ship(3);
  expect(ship.length).toBe(3);
});

test("battleship has been hit", () => {
  const ship = Ship();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.getHits()).toBe(3);
});

test("battleship has sunk", () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test("attack has hit ship", () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(ship, [0, 0], 'vertical');
  board.receiveAttack([1, 0]);
  expect(ship.getHits()).toBe(1);
});

test("can hit ship at second position", () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(ship, [0, 0], "vertical");
  board.receiveAttack([1, 0]);
  expect(ship.getHits()).toBe(1);
});

test("attack missed", () => {
  const board = Gameboard();
  const ship = Ship(3);
  board.placeShip(ship, [1, 0], "vertical");
  board.receiveAttack([4, 0]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([3, 0]); // hit
  expect(board.getMissedAttacks()).toBe(2);
});

test("all Ship have been sunk", () => {
  const board = Gameboard();
  const ship1 = Ship(3);
  const ship2 = Ship(1);

  board.placeShip(ship1, [0, 0], "horizontal");
  board.placeShip(ship2, [2, 0], "horizontal");

  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);
  board.receiveAttack([2, 0]);

  expect(board.allShipsSunk()).toBe(true);
});

test("player can attack enemy board", () => {
  const player1 = Player();
  const player2 = Player();
  const ship = Ship(1);

  player2.board.placeShip(ship, [0, 0], "horizontal");
  player1.attack([0, 0], player2.board);

  expect(ship.getHits()).toBe(1);
});

test("computer makes a valid random attack", () => {
  const computer = Player(true);
  const human = Player();

  computer.randomAttack(human.board);
  computer.randomAttack(human.board);

  const moves = computer.getMoves();

  expect(moves.length).toBe(2);
  expect(new Set(moves).size).toBe(2);
});