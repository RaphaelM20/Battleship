export function renderBoard(board, container, isEnemy) {
  container.innerHTML = "";

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      const key = `${y},${x}`;

      if (!isEnemy && board.shipPositions.has(key)) {
        cell.classList.add("ship");
      }

      const wasHit = board.hitPositions.has(key);
      const wasMissed = board.missedPositions.has(key);

      if (wasHit) {
        cell.classList.add("hit");
      } else if (wasMissed) {
        cell.classList.add("miss");
      }

      container.appendChild(cell);
    }
  }
}
