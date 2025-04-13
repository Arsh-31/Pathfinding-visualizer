export function DFS(
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
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const cameFrom: Record<string, { row: number; col: number } | null> = {};

  let found = false;

  function dfs(row: number, col: number) {
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      visited[row][col] ||
      grid[row][col] === 1 ||
      found
    )
      return;

    visited[row][col] = true;
    visitedOrder.push({ row, col });

    if (row === endNode.row && col === endNode.col) {
      found = true;
      return;
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (!visited[newRow]?.[newCol] && grid[newRow]?.[newCol] !== 1) {
        cameFrom[`${newRow},${newCol}`] = { row, col };
        dfs(newRow, newCol);
      }

      if (found) return; // Stop DFS when end is found
    }
  }

  cameFrom[`${startNode.row},${startNode.col}`] = null;
  dfs(startNode.row, startNode.col);

  const shortestPath: { row: number; col: number }[] = [];
  if (found) {
    let current: { row: number; col: number } | null = endNode;
    while (current) {
      shortestPath.unshift(current);
      current = cameFrom[`${current.row},${current.col}`] ?? null;
    }
  }

  return { visitedOrder, shortestPath };
}
