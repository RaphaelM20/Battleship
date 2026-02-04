export default function Ship(length) {
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
    length,
    hit,
    getHits,
    isSunk,
  };
}
