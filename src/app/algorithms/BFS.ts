export function BFS(
  grid: number[][],
  startNode: { row: number; col: number },
  endNode: { row: number; col: number }
): {
  visitedOrder: { row: number; col: number }[];
  shortestPath: { row: number; col: number }[];
} {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const visitedOrder: { row: number; col: number }[] = [];
  const cameFrom: Record<string, { row: number; col: number } | null> = {};
  const visited: boolean[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const queue: { row: number; col: number }[] = [];

  queue.push(startNode);
  visited[startNode.row][startNode.col] = true;
  cameFrom[`${startNode.row},${startNode.col}`] = null;

  while (queue.length) {
    const current = queue.shift()!;
    visitedOrder.push(current);

    if (current.row === endNode.row && current.col === endNode.col) break;

    for (const [dr, dc] of directions) {
      const newRow = current.row + dr;
      const newCol = current.col + dc;

      if (
        newRow < 0 ||
        newRow >= rows ||
        newCol < 0 ||
        newCol >= cols ||
        visited[newRow][newCol] ||
        grid[newRow][newCol] === 1
      ) {
        continue;
      }

      visited[newRow][newCol] = true;
      cameFrom[`${newRow},${newCol}`] = { row: current.row, col: current.col };
      queue.push({ row: newRow, col: newCol });
    }
  }

  const shortestPath: { row: number; col: number }[] = [];
  let current: { row: number; col: number } | null = endNode;

  while (current) {
    shortestPath.unshift(current);
    current = cameFrom[`${current.row},${current.col}`] ?? null;
  }

  return { visitedOrder, shortestPath };
}
