import { OPTIONS } from '../options';
import {
    getBlockedCorners,
    getSuccessors,
    isUnblocked,
    isGoal,
    tracePath,
} from './algorithm_functions';

/*
    PSEUDOCODE: 
        Starting with the first cell, calc the distance from the first cell to the player cell (this will be 0)
            Then, add all of the neighbors of the cell to the queue to be analyzed
                Calculate the distance from all of these cells to the first cell
                    Then, repeat for all neighboring cells once again
            Keep repeating until there are no cells left in the queue
        
*/

const FLT_MAX = 40000; 
const INCREMENT_ANIMATION = 0.02;

export default function Dijkstra({ cellMap, setCellMap, goalPos, playerPos, passableMaterials }) {
    let dijkstraMap = createCellDetails(playerPos);
    let unvisitedCells = [{ x: playerPos.x, y: playerPos.y, dist: 0 }]; // List of cells to be visited
    let animationTimer = 0;
    let foundGoal = false;
    
    // While there are cells to visit and the goal is not found
    while (unvisitedCells.length > 0 && !foundGoal) {
        let closestCellIndex = getClosestCell(unvisitedCells);
        let closestCell = unvisitedCells[closestCellIndex];
        let successors = getSuccessors(closestCell.x, closestCell.y);
        let blockedCorners = getBlockedCorners(cellMap, successors, passableMaterials);

        for (let i = 0; i < successors.length; i++) {
            let childPos = successors[i];
            let childCell = Object.assign({}, childPos, { dist: FLT_MAX });
            let isBlockedCorner = blockedCorners[i];

            if (
                // Don't evaluate neighbors that are blocked (by walls or water when unwalkable for example)
                isUnblocked(cellMap, childCell.x, childCell.y, passableMaterials) && 

                // Don't evaluate if inaccessible by the adjacent cells
                !isBlockedCorner && 
                
                // Don't reevelaute cells
                !dijkstraMap[childCell.y][childCell.x].visited
            ) {
                // Calculate the distance from this neighbor to the player
                let moveCost = Math.sqrt(Math.pow(Math.abs(childCell.x - closestCell.x), 2) + Math.pow(Math.abs(childCell.y - closestCell.y), 2)) + closestCell.dist;

                if (moveCost < dijkstraMap[childCell.y][childCell.x].dist) {
                    dijkstraMap[childCell.y][childCell.x].parent_x = closestCell.x;
                    dijkstraMap[childCell.y][childCell.x].parent_y = closestCell.y;
                    dijkstraMap[childCell.y][childCell.x].dist = moveCost;
                    childCell.dist = moveCost;

                    // Push this cell to the queue
                    unvisitedCells.push(childCell);
                }

                // Show that this cell has been visited
                let newMap = [...cellMap];
                let newCell = newMap[childCell.y][childCell.x];
                newCell.isVisited = true;
                newCell.transitionDelay = animationTimer;
                newMap[childCell.y][childCell.x] = newCell;
                setCellMap(newMap);

                // Goal case 
                if (isGoal(childCell.x, childCell.y, goalPos)) {
                    tracePath(dijkstraMap, goalPos, cellMap, setCellMap, animationTimer);
                    foundGoal = true;
                }
            }

        }

        // Delay the animation of the next cell's children
        animationTimer += INCREMENT_ANIMATION;

        // Mark this cell as visited and remove it from the list of cells to be visited
        unvisitedCells.splice(closestCellIndex, 1);
        dijkstraMap[closestCell.y][closestCell.x].visited = true;
    }
}

function getClosestCell(unvisitedCells) {
    let shortest_dist = FLT_MAX;
    let shortest_i = -1;

    unvisitedCells.forEach((cell, i) => {
        if (cell.dist < shortest_dist) {
            shortest_dist = cell.dist;
            shortest_i = i;
        }
    });

    return shortest_i;
}

/* CREATEVISITEDLIST ------------
    2D Array of objects that hold information on a visited cell
------------------------------ */
function createCellDetails(playerPos) { // @NOTE: TRY TO REMOVE THE RETURN AND SEE WHAT HAPPENS
    // 2D ARRAY THAT HOLDS INFORMATION ON A CELL
    let list = Array.from({ length: OPTIONS.ROWS },
        () => Array.from({ length: OPTIONS.COLS }, () => {
            return {
                visited: false,
                evaluated: false,
                dist: FLT_MAX,
                parent_x: -1,
                parent_y: -1,
            }
        })
    );

    list[playerPos.y][playerPos.x].parent_x = playerPos.x;
    list[playerPos.y][playerPos.x].parent_y = playerPos.y;

    return list;
}
