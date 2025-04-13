// "use client"

// import React, { useEffect, useState } from "react";

// const Navbar = () => {
//     const [rows, setRows] = useState(0);
//     const [cols, setCols] = useState(0);

//     useEffect(() => {
//         const updateGridSize = () => {
//             const cellSize = 35; // Define cell size
//             const screenWidth = document.documentElement.clientWidth;  // Browser width
//             const screenHeight = document.documentElement.clientHeight; // Browser height

//             setCols(Math.floor(screenWidth / cellSize));
//             setRows(Math.floor(screenHeight / cellSize));
//         };

//         updateGridSize(); // Set grid size initially
//         window.addEventListener("resize", updateGridSize); // Adjust on resize

//         return () => window.removeEventListener("resize", updateGridSize);
//     }, []);

//     const [startNode, setStartNode] = useState<{ row: number, col: number } | null>(null);
//     const placeStartNode = () => {
//         if (startNode) {
//             console.log("NOOOOOO");
//             return;
//         }
//         console.log("placeStartNode");
//         setStartNode({ row: -1, col: -1 });
//     }

//     const [endNode, setEndNode] = useState<{ row: number, col: number } | null>(null);
//     const placeEndNode = () => {
//         if (endNode) {
//             console.log("NOOOOOO");
//             return;
//         }
//         console.log("placeEndNode");
//         setEndNode({ row: -1, col: -1 });
//     }

//     const [obstacleNodes, setObstacleNodes] = useState(false);
//     const placeObstacleNode = () => {
//         console.log("placeObstacleNode");
//         setObstacleNodes(true);
//     }

//     const handleCellClick = (event: React.MouseEvent<HTMLDivElement>, row: number, col: number) => {
//         if (startNode && startNode.row === -1) {
//             event.currentTarget.classList.add("bg-green-800");
//             setStartNode({ row, col });
//         }
//         if (endNode && endNode.row === -1) {
//             event.currentTarget.classList.add("bg-red-800");
//             setEndNode({ row, col });
//         }
//         if (obstacleNodes) {
//             event.currentTarget.classList.add("bg-blue-800");
//             setObstacleNodes(false);
//         }
//     }

//     const [isMouseDown, setIsMouseDown] = useState(false);

//     const colorCell = (cell: HTMLDivElement) => {
//         cell.classList.add("bg-blue-800");
//     }
//     const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
//         if (obstacleNodes) {
//             setIsMouseDown(true);
//             colorCell(event.currentTarget);
//         }
//     }

//     const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
//         if (obstacleNodes) {
//             if (isMouseDown) {
//                 colorCell(event.currentTarget);
//             }
//         }
//     }
//     useEffect(() => {
//         document.addEventListener("mouseup", handleMouseLeave);
//         return () => {
//             document.removeEventListener("mouseup", handleMouseLeave);
//         }
//     })

//     const handleMouseLeave = () => {
//         setIsMouseDown(false);
//     }

//     return (
//         <>
//             <nav className="flex justify-between items-center px-6 py-7 bg-[#0D1321] text-[#FFFFFF]">
//                 <div className="flex items-center space-x-3">
//                     <h1 className="text-xl font-bold">Pathfinding Visualizer</h1>
//                     <select className="">
//                         <option>Dijkstra's Algorithm</option>
//                         <option>A* Algorithm</option>
//                         <option>BFS</option>
//                         <option>DFS</option>
//                     </select>
//                     <button className="cursor-pointer bg-[#3E5C76] px-4 py-2 rounded">
//                         Random Maze
//                     </button>
//                 </div>

//                 <div className="flex items-center space-x-3">

//                     <button className="flex items-center cursor-pointer bg-[#3E5C76] px-4 py-2 rounded"
//                         onClick={placeStartNode}>
//                         <span className="mr-2">Set Start</span>
//                         <span className=" flex-shrink-0 bg-[#C2EABD] w-4 h-4 rounded-full"></span>
//                     </button>

//                     <button className="flex items-center cursor-pointer bg-[#3E5C76] px-4 py-2 rounded"
//                         onClick={placeEndNode}>
//                         <span className="mr-2">Set End</span>
//                         <span className=" flex-shrink-0 bg-[#ED254E] w-4 h-4 rounded-full inline-block"></span>
//                     </button>

//                     <button className="flex items-center cursor-pointer bg-[#3E5C76] px-4 py-2 rounded"
//                         onClick={placeObstacleNode}>
//                         <span className="mr-2">Add Walls</span>
//                         <span className=" flex-shrink-0 bg-[#011936] w-4 h-4 rounded-full inline-block"></span>
//                     </button>

//                     <button className="cursor-pointer bg-[#3E5C76] px-4 py-2 rounded">Clear Board</button>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                     <button className="cursor-pointer bg-[#3E5C76] px-4 py-2 rounded">Run</button>
//                     <button className="cursor-pointer bg-[#3E5C76] px-4 py-2 rounded">Reset</button>
//                     <select className="">
//                         <option>Slow</option>
//                         <option>Normal</option>
//                         <option>Fast</option>
//                     </select>
//                     {/* <button className="">🌙</button> */}
//                 </div>
//             </nav>

//             <div
//                 className="grid w-screen h-screen"
//                 style={{
//                     width: "100vw", // Covers browser width
//                     height: "100vh", // Covers browser height
//                     gridTemplateColumns: `repeat(${cols}, 1fr)`,
//                     gridTemplateRows: `repeat(${rows}, 1fr)`,
//                 }}
//             >
//                 {Array.from({ length: rows }).map((_, row) =>
//                     Array.from({ length: cols }).map((_, col) => (
//                         <div
//                             key={`${row}-${col}`}
//                             className="border border-gray-700 w-full h-full cursor-pointer"
//                             onClick={(event) => handleCellClick(event, row, col)}
//                             onMouseDown={(event) => handleMouseDown(event)}
//                             onMouseEnter={(event) => handleMouseEnter(event)}
//                         ></div>
//                     ))
//                 )}

//             </div>
//         </>

//     )
// }

// export default Navbar;

// {/* 465362  C2EABD ED254E 011936  #0D1321*/ }
// {/* visited node - blue, final path - yellow, start node - green, end node - red, walls/obstcales/stuff - darkish blue */ }

// const handleMouseDown = (
//   event: React.MouseEvent<HTMLDivElement>,
//   row: number,
//   col: number
// ) => {
//   if (placingObstacles) {
//     setIsMouseDown(true);
//     event.currentTarget.classList.add("bg-[#0D1321]");
//     placeWall(event, row, col);
//   }
// };

// const handleMouseEnter = (
//   event: React.MouseEvent<HTMLDivElement>,
//   row: number,
//   col: number
// ) => {
//   if (placingObstacles && isMouseDown) {
//     event.currentTarget.classList.add("bg-[#0D1321]");
//     placeWall(event, row, col);
//   }
// };

// const placeWall = (
//     event: React.MouseEvent<HTMLDivElement>,
//     row: number,
//     col: number
//   ) => {
//     // if (!placingObstacles) {
//     //   console.log("NOOOOO");
//     //   return;
//     // }
//     // setObstacleNodes((prev) => {
//     //   if (prev.some((node) => node.row === row && node.col === col))
//     //     return prev;
//     //   return [...prev, { row, col }];
//     // });
//     // event.currentTarget.classList.add("bg-[#0D1321]");
//     const newObstacles = [];
//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         // Don't place walls where start or end nodes are
//         if (
//           (startNode && startNode.row === row && startNode.col === col) ||
//           (endNode && endNode.row === row && endNode.col === col)
//         )
//           continue;

//         // ~30% chance to be a wall
//         if (Math.random() < 0.3) {
//           newObstacles.push({ row, col });
//         }
//       }
//     }
//     setObstacleNodes(newObstacles);
//   };

// useEffect(() => {
//   console.log("Walls Updated: ", obstacleNodes);
// }, [obstacleNodes]);

// useEffect(() => {
//     const handleMouseUp = () => {
//       setIsMouseDown(false);
//     };
//     document.addEventListener("mouseup", () => setIsMouseDown(false));
//     return () =>
//       document.removeEventListener("mouseup", () => setIsMouseDown(false));
//   }, []);

// useEffect(() => {
//   const handleMouseUp = () => {
//     setIsMouseDown(false);
//   };
//   document.addEventListener("mouseup", () => setIsMouseDown(false));
//   return () =>
//     document.removeEventListener("mouseup", () => setIsMouseDown(false));
// }, []);

// const [isMouseDown, setIsMouseDown] = useState(false);
