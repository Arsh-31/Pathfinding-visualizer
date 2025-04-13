import React from "react";

interface NavbarProps {
  placeStartNode: () => void;
  placeEndNode: () => void;
  handleRun: () => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  clearPath: () => void;
  generateRandomMaze: () => void;
  generateRandomWalls: () => void;
  resetGrid: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  placeStartNode,
  placeEndNode,
  handleRun,
  selectedAlgorithm,
  setSelectedAlgorithm,
  clearPath,
  generateRandomMaze,
  generateRandomWalls,
  resetGrid,
}) => {
  return (
    <div id="navbar">
      <nav className="flex justify-between items-center px-6 py-7 bg-[#1B2A41] text-[#FFFFFF]">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold">Pathfinding Visualizer</h1>
          <select
            className=""
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
          >
            <option value="Dijkstra">Dijkstra&apos;s Algorithm</option>
            <option value="AStar">A* Algorithm</option>
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
          </select>
          <button
            className="cursor-pointer bg-[#5A7890] px-4 py-2 rounded"
            onClick={generateRandomMaze}
          >
            Random Maze
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            className="bg-[#5A7890] px-4 py-2 rounded cursor-pointer"
            onClick={placeStartNode}
          >
            Set Start Node
          </button>
          <button
            className="bg-[#5A7890] px-4 py-2 rounded cursor-pointer"
            onClick={placeEndNode}
          >
            Set End
          </button>
          <button
            className="bg-[#5A7890] px-4 py-2 rounded cursor-pointer"
            onClick={generateRandomWalls}
          >
            Add Walls
            {/* {placingObstacles ? "Stop Adding Walls" : "Add Walls"} */}
          </button>
          <button
            className="bg-[#5A7890] px-4 py-2 rounded cursor-pointer"
            onClick={clearPath}
          >
            Clear Path
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            className="bg-[#5A7890] px-4 py-2 rounded cursor-pointer"
            onClick={handleRun}
          >
            Run
          </button>
          <button
            className="bg-[#5A7890] px-4 py-2 rounded cursor-pointer"
            onClick={resetGrid}
          >
            Reset
          </button>
          {/* <select>
            <option>Slow</option>
            <option>Normal</option>
            <option>Fast</option>
          </select> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
