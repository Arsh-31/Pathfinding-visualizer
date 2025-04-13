import { MinHeap } from "./MinHeap";

export function Dijkstra(
  grid: number[][],
  start: { row: number; col: number },
  end: { row: number; col: number }
) {
  const rows = grid.length;
  const cols = grid[0].length;

  const heap = new MinHeap();
  // const visited = Array.from({length: rows}, () => Array.from({length: cols}, () => false));
  const visited = new Set<string>();
  const distances: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Infinity)
  );
  const previous: (null | { row: number; col: number })[][] = Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => null)
  );
  const visitedOrder: { row: number; col: number }[] = [];

  distances[start.row][start.col] = 0;
  heap.insert({ row: start.row, column: start.col, distance: 0 });

  while (!heap.isEmpty()) {
    //heap.size() > 0
    const node = heap.extractMin();
    if (!node) break;

    const { row, column, distance } = node;

    if (visited.has(`${row} -${column}`)) continue;
    visited.add(`${row} -${column}`);
    visitedOrder.push({ row, col: column });

    if (row === end.row && column === end.col) break;

    const directions = [
      { dr: -1, dc: 0 }, // up
      { dr: 1, dc: 0 }, // down
      { dr: 0, dc: -1 }, // left
      { dr: 0, dc: 1 }, // right
    ];

    for (const { dr, dc } of directions) {
      const newRow = row + dr;
      const newCol = column + dc;

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] != 1
      ) {
        const newDistance = distance + 1;

        if (newDistance < distances[newRow][newCol]) {
          distances[newRow][newCol] = newDistance;
          heap.insert({ row: newRow, column: newCol, distance: newDistance });
          previous[newRow][newCol] = { row, col: column };
        }
      }
    }
  }
  const shortestPath = reconstructPath(previous, start, end);
  return { visitedOrder, shortestPath };
}

function reconstructPath(
  previous: ({ row: number; col: number } | null)[][],
  start: { row: number; col: number },
  end: { row: number; col: number }
) {
  const path: { row: number; col: number }[] = [];
  let current = end;

  while (current) {
    path.push(current);

    if (!previous[current.row][current.col]) break;
    current = previous[current.row][current.col]!;
  }

  path.reverse();

  if (path[0].row != start.row || path[0].col != start.col) {
    console.log("Son of a bitch!!!!");
    return [];
  }

  console.log("patH: ", path);
  return path;
}
