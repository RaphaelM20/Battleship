export default function Ship(length) {
  let hits = 0;

  function hit() {
    hits++;
  }

  function getHits() {
    return hits;
  }

  function isSunk() {
    if (hits >= length) {
      return true;
    } else {
      return false;
    }
  }
  return {
    length,
    hit,
    getHits,
    isSunk,
  };
}
