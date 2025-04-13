"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import { Dijkstra } from "./algorithms/Dijkstra";
import { AStar } from "./algorithms/AStar";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";

// const clearPathRef = useRef<() => void>(() => {});
const PathfindingVisualizer = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [startNode, setStartNode] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [endNode, setEndNode] = useState<{ row: number; col: number } | null>(
    null
  );
  const [obstacleNodes, setObstacleNodes] = useState<
    { row: number; col: number }[]
  >([]);
  const [placingObstacles, setPlacingObstacles] = useState(false);

  const [runAlgorithm, setRunAlgorithm] = useState(false);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Dijkstra");

  const clearPathRef = useRef<(() => void) | null>(null); // works

  useEffect(() => {
    const updateGridSize = () => {
      const cellSize = 25;
      const newCols = Math.floor(window.innerWidth / cellSize);
      const newRows = Math.floor(window.innerHeight / cellSize);

      setCols((prev) => (prev !== newCols ? newCols : prev));
      setRows((prev) => (prev !== newRows ? newRows : prev));
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  const getAlgorithm = () => {
    switch (selectedAlgorithm) {
      case "AStar":
        return AStar;
      case "Dijkstra":
        return Dijkstra;
      case "BFS":
        return BFS;
      case "DFS":
        return DFS;
      default:
        return Dijkstra;
    }
  };

  useEffect(() => {
    console.log("Algorithm changed to:", selectedAlgorithm);
  }, [selectedAlgorithm]);

  const handleRun = () => {
    // const algorithm = getAlgorithm();

    // if (algorithm) {
    setRunAlgorithm(true); // trigger the useEffect to run it
    // } else {
    //   alert(`${selectedAlgorithm} is not implemented yet!`);
    // }
  };

  // Random Maze
  const generateRandomWalls = () => {
    const newObstacles = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Don't place walls where start or end nodes are
        if (
          (startNode && startNode.row === row && startNode.col === col) ||
          (endNode && endNode.row === row && endNode.col === col)
        )
          continue;

        // ~30% chance to be a wall
        if (Math.random() < 0.3) {
          newObstacles.push({ row, col });
        }
      }
    }
    setObstacleNodes(newObstacles);
  };

  const generateRandomMaze = () => {
    if (clearPathRef?.current) {
      clearPathRef.current();
    }

    const newObstacles = [];
    let randomStart = null;
    let randomEnd = null;

    // Randomly pick two unique positions for start and end
    const totalCells = rows * cols;
    const startIndex = Math.floor(Math.random() * totalCells);
    let endIndex = Math.floor(Math.random() * totalCells);
    while (endIndex === startIndex) {
      endIndex = Math.floor(Math.random() * totalCells);
    }

    const start = {
      row: Math.floor(startIndex / cols),
      col: startIndex % cols,
    };
    const end = { row: Math.floor(endIndex / cols), col: endIndex % cols };

    randomStart = start;
    randomEnd = end;

    // Now fill the grid with obstacles randomly (avoid start and end)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (
          (row === randomStart.row && col === randomStart.col) ||
          (row === randomEnd.row && col === randomEnd.col)
        ) {
          continue;
        }

        // 30% chance to become a wall
        if (Math.random() < 0.3) {
          newObstacles.push({ row, col });
        }
      }
    }

    setStartNode(randomStart);
    setEndNode(randomEnd);
    setObstacleNodes(newObstacles);
  };

  const resetGrid = () => {
    setStartNode(null);
    setEndNode(null);
    setObstacleNodes([]);
    if (clearPathRef.current) {
      clearPathRef.current();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        placeStartNode={() => {
          if (!startNode) {
            setStartNode({ row: -1, col: -1 });
          } else {
            console.log("Start node already placed");
          }
        }}
        placeEndNode={() => {
          if (!endNode) {
            setEndNode({ row: -1, col: -1 });
          } else {
            console.log("End node already placed");
          }
        }}
        // placeObstacleNode={() => setPlacingObstacles((prev) => !prev)}
        // placingObstacles={placingObstacles}
        handleRun={handleRun}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        clearPath={() => {
          if (clearPathRef?.current) {
            clearPathRef.current(); // this clears just the path
          }
        }}
        // clearPath={clearPath}
        generateRandomMaze={generateRandomMaze}
        generateRandomWalls={generateRandomWalls}
        resetGrid={resetGrid}
      />
      <Grid
        rows={rows}
        cols={cols}
        startNode={startNode}
        endNode={endNode}
        setStartNode={setStartNode}
        setEndNode={setEndNode}
        obstacleNodes={obstacleNodes}
        // setObstacleNodes={setObstacleNodes}
        placingObstacles={placingObstacles}
        setPlacingObstacles={setPlacingObstacles}
        runAlgorithm={runAlgorithm}
        setRunAlgorithm={setRunAlgorithm}
        // algorithm={Dijkstra}
        algorithm={getAlgorithm()}
        clearPathRef={clearPathRef}
      />
    </div>
  );
};

export default PathfindingVisualizer;
