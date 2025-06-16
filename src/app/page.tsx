"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Grid from "../components/Grid";
import { Dijkstra } from "./algorithms/Dijkstra";
import { AStar } from "./algorithms/AStar";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";

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
  const [runAlgorithm, setRunAlgorithm] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Dijkstra");
  const clearPathRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const updateGridSize = () => {
      const cellSize = 25;
      const availableWidth = window.innerWidth - 40;
      const availableHeight = window.innerHeight - 100;

      const newCols = Math.floor(availableWidth / cellSize);
      const newRows = Math.floor(availableHeight / cellSize);

      setCols(newCols);
      setRows(newRows);
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

  const handleRun = () => {
    setRunAlgorithm(true);
  };

  const generateRandomMaze = () => {
    if (clearPathRef?.current) {
      clearPathRef.current();
    }

    const newObstacles = [];
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
    const end = {
      row: Math.floor(endIndex / cols),
      col: endIndex % cols,
    };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (
          (row === start.row && col === start.col) ||
          (row === end.row && col === end.col)
        ) {
          continue;
        }
        if (Math.random() < 0.3) {
          newObstacles.push({ row, col });
        }
      }
    }

    setStartNode(start);
    setEndNode(end);
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
          }
        }}
        placeEndNode={() => {
          if (!endNode) {
            setEndNode({ row: -1, col: -1 });
          }
        }}
        handleRun={handleRun}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        clearPath={() => {
          if (clearPathRef?.current) {
            clearPathRef.current();
          }
        }}
        generateRandomMaze={generateRandomMaze}
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
        runAlgorithm={runAlgorithm}
        setRunAlgorithm={setRunAlgorithm}
        algorithm={getAlgorithm()}
        clearPathRef={clearPathRef}
        // placingObstacles={placingObstacles}
        // setPlacingObstacles={setPlacingObstacles}
      />
    </div>
  );
};

export default PathfindingVisualizer;
