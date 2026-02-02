export default function Gameboard() {
  const shipPositions = new Map();
  const missedPositions = new Map();
  const placedShips = [];

  function placeShip(ship, coord, direction) {
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        const key = `${coord[0]},${coord[1] + i}`;
        shipPositions.set(key, ship)
      }
    }
    else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        const key = `${coord[0] + i},${coord[1]}`;
        shipPositions.set(key, ship)
      }
    }
    placedShips.push(ship);
  }

  function receiveAttack(coord) {
    const key = coord.toString();
    const ship = shipPositions.get(key);

    if (ship) {
      ship.hit();
    }
    else {
      missedPositions.set(key, true);
    }
  }

  function getMissedAttacks() {
    return missedPositions.size;
  }

  function allShipsSunk() {
    return placedShips.every(ship => ship.isSunk());
  }

  return {
    placeShip,
    receiveAttack,
    getMissedAttacks,
    allShipsSunk,
    shipPositions
  };
};
