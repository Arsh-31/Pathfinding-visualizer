import React, { useEffect, useState } from "react";

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
      className="grid w-full h-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className={`border border-[#1B2A41] w-full h-full cursor-pointer
              ${
                startNode?.row === row && startNode?.col === col
                  ? "bg-[#8FC0A9]" //start
                  : ""
              }
              ${
                endNode?.row === row && endNode?.col === col
                  ? "bg-[#E54F6D]" // end
                  : ""
              }
              ${
                obstacleNodes.some(
                  (node) => node.row === row && node.col === col
                )
                  ? "bg-[#1B2A41]" // obstacles
                  : ""
              }
              ${
                visitedNodes.some(
                  (node) => node.row === row && node.col === col
                ) &&
                !shortestPath.some(
                  (node) => node.row === row && node.col === col
                ) &&
                !(startNode?.row === row && startNode?.col === col)
                  ? "bg-[#BFDBF7] animate-visited" // visited // transition duration-500
                  : ""
              }
              ${
                shortestPath.some(
                  (node) => node.row === row && node.col === col
                ) &&
                !(
                  (startNode?.row === row && startNode?.col === col) ||
                  (endNode?.row === row && endNode?.col === col)
                )
                  ? "bg-[#F4D35E] transition duration-500" // final path
                  : ""
              }`}
            onClick={(event) => handleCellClick(event, row, col)}
            // onMouseDown={(event) => handleMouseDown(event, row, col)}
            // onMouseEnter={(event) => handleMouseEnter(event, row, col)}
          ></div>
        ))
      )}
    </div>
  );
};

export default Grid;
