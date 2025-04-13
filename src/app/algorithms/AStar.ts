export function AStar(
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

  const heuristic = (
    a: { row: number; col: number },
    b: { row: number; col: number }
  ) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col); // Manhattan

  const visitedOrder: { row: number; col: number }[] = [];
  const cameFrom: Record<string, { row: number; col: number } | null> = {};
  const gScore: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const fScore: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const openSet: { row: number; col: number; f: number }[] = [];

  gScore[startNode.row][startNode.col] = 0;
  fScore[startNode.row][startNode.col] = heuristic(startNode, endNode);
  openSet.push({ ...startNode, f: fScore[startNode.row][startNode.col] });
  cameFrom[`${startNode.row},${startNode.col}`] = null;

  while (openSet.length) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;
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
        grid[newRow][newCol] === 1
      )
        continue;

      const tentativeG = gScore[current.row][current.col] + 1;

      if (tentativeG < gScore[newRow][newCol]) {
        cameFrom[`${newRow},${newCol}`] = {
          row: current.row,
          col: current.col,
        };
        gScore[newRow][newCol] = tentativeG;
        fScore[newRow][newCol] =
          tentativeG + heuristic({ row: newRow, col: newCol }, endNode);

        if (!openSet.some((n) => n.row === newRow && n.col === newCol)) {
          openSet.push({ row: newRow, col: newCol, f: fScore[newRow][newCol] });
        }
      }
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
