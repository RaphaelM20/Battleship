export function Ship(name, length) {
  let hits = 0;

  function hit() {
    hits++;
  }

  function getHits() {
    return hits;
  }

  function isSunk() {
    return hits >= length;
  }

  return {
    name,
    length,
    hit,
    getHits,
    isSunk,
  };
}

function createShipList() {
  return [
    Ship("Carrier", 5),
    Ship("Battleship", 4),
    Ship("Cruiser", 3),
    Ship("Submarine", 2),
    Ship("Destroyer", 2),
  ];
}

export { Ship, createShipList }; 