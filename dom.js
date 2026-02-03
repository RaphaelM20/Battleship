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

      container.appendChild(cell);
    }
  }
}