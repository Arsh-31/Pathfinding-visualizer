"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";

interface NavbarProps {
  placeStartNode: () => void;
  placeEndNode: () => void;
  handleRun: () => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  clearPath: () => void;
  generateRandomMaze: () => void;
  // generateRandomWalls: () => void;
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
  // generateRandomWalls,
  resetGrid,
}) => {
  const { setTheme } = useTheme();
  return (
    <div
      id="navbar"
      className="flex justify-between px-6 py-4 border-b shadow-sm bg-background text-foreground"
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
                <SelectItem value="Dijkstra">
                  Dijkstra&apos;s Algorithm
                </SelectItem>
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
            {/* <Button onClick={generateRandomWalls}>Add Walls</Button> */}
            <Button onClick={clearPath}>Clear Path</Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <Button onClick={handleRun}>Run</Button>
            <Button onClick={resetGrid}>Reset</Button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
