import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div
      id="navbar"
      className="px-6 py-4 border-b shadow-sm bg-background text-foreground"
    >
      <NavigationMenu className="w-full">
        <NavigationMenuList className="flex justify-between w-full items-center gap-6 flex-wrap">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Pathfinding Visualizer</h1>

            <Select
              value={selectedAlgorithm}
              onValueChange={setSelectedAlgorithm}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dijkstra">Dijkstra's Algorithm</SelectItem>
                <SelectItem value="AStar">A* Algorithm</SelectItem>
                <SelectItem value="BFS">BFS</SelectItem>
                <SelectItem value="DFS">DFS</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="default" onClick={generateRandomMaze}>
              Random Maze
            </Button>
          </div>

          {/* Middle Section */}
          <div className="flex items-center space-x-3">
            <Button onClick={placeStartNode}>Set Start Node</Button>
            <Button onClick={placeEndNode}>Set End</Button>
            <Button onClick={generateRandomWalls}>Add Walls</Button>
            <Button onClick={clearPath}>Clear Path</Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <Button onClick={handleRun}>Run</Button>
            <Button onClick={resetGrid}>Reset</Button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
