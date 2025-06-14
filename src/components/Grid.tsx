import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
interface GridProps {
  rows: number;
  cols: number;
  startNode: { row: number; col: number } | null;
  endNode: { row: number; col: number } | null;
  setStartNode: React.Dispatch<
    React.SetStateAction<{ row: number; col: number } | null>
  >;
  setEndNode: React.Dispatch<
    React.SetStateAction<{ row: number; col: number } | null>
  >;
  obstacleNodes: { row: number; col: number }[];
  // setObstacleNodes: React.Dispatch<
  //   React.SetStateAction<{ row: number; col: number }[]>
  // >;
  placingObstacles: boolean;
  setPlacingObstacles: React.Dispatch<React.SetStateAction<boolean>>;
  runAlgorithm: boolean;
  setRunAlgorithm: React.Dispatch<React.SetStateAction<boolean>>;

  algorithm: (
    grid: number[][],
    startNode: { row: number; col: number },
    endNode: { row: number; col: number }
  ) => {
    visitedOrder: { row: number; col: number }[];
    shortestPath: { row: number; col: number }[];
  };

  clearPathRef?: React.RefObject<(() => void) | null>;
}

const Grid: React.FC<GridProps> = ({
  rows,
  cols,
  startNode,
  endNode,
  setStartNode,
  setEndNode,
  obstacleNodes,
  runAlgorithm,
  setRunAlgorithm,
  algorithm,
  clearPathRef,
}) => {
  const [visitedNodes, setVisitedNodes] = useState<
    { row: number; col: number }[]
  >([]);
  const [shortestPath, setShortestPath] = useState<
    { row: number; col: number }[]
  >([]);
  const [isPathFound, setIsPathFound] = useState(false);

  const grid = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) =>
      obstacleNodes.some((node) => node.row === row && node.col === col) ? 1 : 0
    )
  );

  useEffect(() => {
    if (!runAlgorithm) return;

    if (!startNode || !endNode) {
      console.log("Select start and end nodes first!");
      return;
    }

    setRunAlgorithm(false);
    setVisitedNodes([]);
    setShortestPath([]);
    setIsPathFound(false);

    const { visitedOrder, shortestPath } = algorithm(
      grid,
      startNode ?? { row: 0, col: 0 },
      endNode ?? { row: 0, col: 0 }
    ) || { visitedOrder: [], shortestPath: [] };

    // Animate visited nodes
    visitedOrder.forEach((node, index) => {
      setTimeout(() => {
        setVisitedNodes((prev) => [...prev, node]);
      }, index * 10);
    });

    // Animate shortest path after visiting nodes
    setTimeout(() => {
      if (shortestPath.length > 0) {
        setIsPathFound(true);
      }
      shortestPath.forEach((node, index) => {
        setTimeout(() => {
          setShortestPath((prev) => [...prev, node]);
        }, index * 50);
      });
    }, visitedOrder.length * 10);
  }, [runAlgorithm, algorithm, endNode, grid, setRunAlgorithm, startNode]);

  useEffect(() => {
    if (clearPathRef) {
      clearPathRef.current = () => {
        setVisitedNodes([]);
        setShortestPath([]);
        setIsPathFound(false);
      };
    }
  }, [clearPathRef]);

  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    if (startNode && startNode.row === -1) {
      event.currentTarget.classList.add("bg-green-800");
      setStartNode({ row, col });
      return;
    }
    if (endNode && endNode.row === -1) {
      event.currentTarget.classList.add("bg-red-800");
      setEndNode({ row, col });
      return;
    }
  };

  return (
    <div
      className={cn(
        "grid w-full h-full",
        isPathFound && "path-found"
      )}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const isStart = startNode?.row === row && startNode?.col === col;
          const isEnd = endNode?.row === row && endNode?.col === col;
          const isObstacle = obstacleNodes.some(
            (node) => node.row === row && node.col === col
          );
          const isVisited = visitedNodes.some(
            (node) => node.row === row && node.col === col
          );
          const isPath = shortestPath.some(
            (node) => node.row === row && node.col === col
          );

          const baseClasses =
            "border border-[--border] w-full h-full cursor-pointer transition duration-200 flex items-center justify-center min-h-[1.5rem] min-w-[1.5rem] relative";

          const borderColor = "border-[var(--secondary)]";
          let cellClass = "";

          if (isStart) {
            cellClass =
              "bg-[var(--primary)] text-[var(--primary-foreground)] font-bold";
          } else if (isEnd) {
            cellClass =
              "bg-[var(--primary)] text-[var(--primary-foreground)] font-bold";
          } else if (isObstacle) {
            cellClass = "bg-[var(--wall)]"; // Dark muted wall
          } else if (isPath) {
            cellClass = "bg-[var(--path)] animate-path"; // Neutral gray path with subtle glow
          } else if (isVisited) {
            cellClass = "animate-visited"; // Animated gray shades
          }

          return (
            <div
              key={`${row}-${col}`}
              className={cn(
                baseClasses,
                borderColor,
                cellClass,
                "hover:brightness-105",
                "group" // Add group for hover effects
              )}
              onClick={(e) => handleCellClick(e, row, col)}
            >
              {isStart && (
                <>
                  <span className="absolute inset-0 flex items-center justify-center text-lg">
                    S
                  </span>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-[var(--primary-foreground)] px-2 py-0.5 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Start
                  </span>
                </>
              )}
              {isEnd && (
                <>
                  <span className="absolute inset-0 flex items-center justify-center text-lg">
                    E
                  </span>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-[var(--primary-foreground)] px-2 py-0.5 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    End
                  </span>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Grid;
