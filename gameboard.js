export default function Gameboard() {
  const shipPositions = new Map();
  const missedPositions = new Set();
  const hitPositions = new Set();
  const placedShips = [];

  function placeShip(ship, coord, direction) {
    const [row, col] = coord;

    if (direction === "X") {
      const keyValues = [];
      for (let i = 0; i < ship.length; i++) {
        const key = `${row},${col + i}`;
        if (col + i > 9 || shipPositions.has(key)) {
          return false;
        }
        keyValues.push(key);
      }
      keyValues.forEach((key) => {
        shipPositions.set(key, ship);
      });
    } else if (direction === "Y") {
      const keyValues = [];
      for (let i = 0; i < ship.length; i++) {
        const key = `${row + i},${col}`;
        if (row + i > 9 || shipPositions.has(key)) {
          return false;
        }
        keyValues.push(key);
      }
      keyValues.forEach((key) => {
        shipPositions.set(key, ship);
      });
    }
    placedShips.push(ship);
    return true;
  }

  function receiveAttack(coord) {
    const key = coord.toString();
    const ship = shipPositions.get(key);

    if (ship) {
      ship.hit();
      hitPositions.add(key);
      if (ship.isSunk()) {
        return "sunk";
      }
      console.log("hit called on ship: ", key);
      return "hit";
    } else {
      missedPositions.add(key);
      return "miss";
    }
  }

  function getMissedAttacks() {
    return missedPositions.size;
  }

  function allShipsSunk() {
    return placedShips.every((ship) => ship.isSunk());
  }

  function placeShipsRandomly(shipsArray) {
    for (const ship of shipsArray) {
      let placed = false;

      while (!placed) {
        const direction = Math.random() < 0.5 ? "X" : "Y";
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const coord = [row, col];

        placed = placeShip(ship, coord, direction);
      }
    }
  }

  return {
    placeShip,
    receiveAttack,
    getMissedAttacks,
    allShipsSunk,
    shipPositions,
    missedPositions,
    hitPositions,
    placedShips,
    placeShipsRandomly,
  };
}
