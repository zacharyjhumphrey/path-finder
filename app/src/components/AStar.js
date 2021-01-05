import { OPTIONS } from './options';
import { MATERIALS } from './Materials';
import _ from 'lodash';

// @PICKUP Breaking does not break both loops, and because of of that the algorithm finds the goal 3 times

const interval = 400;
const FLT_MAX = 40000; // Don't know what this value is yet

export default function AStar({ cellMap, setCellMap, goalPos, playerPos }) {
    let openList = createOpenList(playerPos); // @FIX GIVE IT THE PROPER DATA STRUCTURE
    let closedList = createClosedList(playerPos);
    let cellDetails = createCellDetails(playerPos);
    let foundGoal = false;

    // While the list of available cells is not empty,
    // AND the goal is not found
    while (openList.length > 0 && !foundGoal) {
        // Get the info on the first node in the array
        // This loop will evaluate all of the information from the array
        let p = openList[0]; 
        let parent = cellDetails[p.y][p.x];
        openList.splice(0,1); // @NOTE: MIGHT NOT WORK IF THERE IS ONLY ONE VALUE IN THE ARRAY
        closedList[p.y][p.x] = true;

        let successors = getSuccessors(p.x, p.y);

        // Loop through the 8 adjacent cells
        for (let i = 0; i < 8; i++) {
            let nodeX = successors[i].x,
                nodeY = successors[i].y;

            // Calculate a cell's f-value if it is within map bounds 
            // AND it is a passable cell 
            // AND it has not been visited before
            if ( isValid(nodeX, nodeY) ) {
                if (
                    isUnblocked(cellMap, nodeX, nodeY) &&
                    !closedList[nodeY][nodeX]
                ) {
                    // GOAL CASE 
                    if (isGoal(nodeX, nodeY, goalPos)) {
                        foundGoal = true;

                        cellDetails[nodeY][nodeX].parent_x = p.x;
                        cellDetails[nodeY][nodeX].parent_y = p.y;

                        tracePath(cellDetails, goalPos, cellMap, setCellMap);
                        break; // @NOTE: THIS ALSO NEEDS TO BREAK OUT OF THE WHILE LOOP, NOT SURE IF IT WILL
                    }
                    // NORMAL CASE (GENERIC, AVAILABLE CELL)
                    else {
                        let node = cellDetails[nodeY][nodeX];
                        let newG = parent.g + 1; // CALC G VALUE
                        let newH = getHValue(nodeX, nodeY, goalPos); // CALC H VALUE 
                        let newF = newG + newH;

                        if (
                            node.f === FLT_MAX ||
                            node.f > newF
                        ) {
                            openList.push({ f: 0, x: nodeX, y: nodeY });

                            // Update the details of the cell
                            cellDetails[nodeY][nodeX] = {
                                f: newF,
                                g: newG,
                                h: newH,
                                parent_x: p.x,
                                parent_y: p.y,
                            }
                        }
                    }
                }
            }

        }

    }

    if (!foundGoal) console.log('ERROR: FAILED TO FIND GOAL');
}

/* CREATEOPENLIST ------------
    Creates a Stack of the cells that have not been visited by the algorithm
--------------------------- */
function createOpenList(playerPos) {
    // LINKED LIST 
    let list = [];

    // SET DATA ON STARTING POSITION
    list[0] = { f: 0, x: playerPos.x, y: playerPos.y };

    return list;
}

/* CREATECLOSEDLIST ------------- 
    Creates a 2D Array (map) representation of cells

    false: means that the cell has not been visited
    true: means that hte cell has been visited
------------------------------ */
function createClosedList(playerPos) {
    // 2D ARRAY OF FALSE VALUES
    let list = Array.from({ length: OPTIONS.ROWS }, 
        () => Array.from({ length: OPTIONS.COLS }, () => false)
    );

    return list;
}

/* CREATECELLDETAILS ------------
    2D Array of objects that hold information on a cell
------------------------------ */
function createCellDetails(playerPos) { // @NOTE: TRY TO REMOVE THE RETURN AND SEE WHAT HAPPENS
    // 2D ARRAY THAT HOLDS INFORMATION ON A CELL
    let list = Array.from({ length: OPTIONS.ROWS },
        () => Array.from({ length: OPTIONS.COLS }, () => {
            return {
                f: FLT_MAX,
                g: FLT_MAX,
                h: FLT_MAX,
                parent_x: -1,
                parent_y: -1,
            }
        })
    );

    // SET DATA OF STARTING NODE
    list[playerPos.y][playerPos.x] = {
        f: 0,
        g: 0,
        h: 0,
        parent_x: playerPos.x,
        parent_y: playerPos.y,
    }

    return list;
}

/* GETSUCCESSORS ----------------
    Returns an array of position objects for the surrounding nodes
------------------------------- */
function getSuccessors(x, y) {
    return [
        { x: x - 1, y: y - 1 }, 
        { x: x    , y: y - 1 }, 
        { x: x + 1, y: y - 1 }, 
        { x: x - 1, y: y     }, 
        { x: x + 1, y: y     }, 
        { x: x - 1, y: y + 1 }, 
        { x: x    , y: y + 1 },
        { x: x + 1, y: y + 1 }, 
    ]
}

/* GETHVALUE --------------------
    Generates the h-value (distance between the node and the goal) for a given node
------------------------------ */
function getHValue(x, y, goal) {
    return _.max([Math.abs(x - goal.x), Math.abs(y - goal.y)]);
}

/* ISVALID ----------------------
    Returns whether or not a node is within bounds
------------------------------ */
function isValid(x, y) {
    return (
        x >= 0 && x < OPTIONS.COLS &&
        y >= 0 && y < OPTIONS.ROWS
    )
}

/* ISUNBLOCKED ------------------
    Returns whether or not a node is capable of being passed
------------------------------ */
function isUnblocked(cellMap, x, y) {
    return cellMap[y][x].isPassable;
}

/* ISGOAL ------------------
    Returns whether or not a node is the goal
------------------------------ */
function isGoal(x, y, goal) {
    return (
        x === goal.x &&
        y === goal.y
    )
}

function tracePath(cellDetails, goalPos, cellMap, setCellMap) {
    let tempRow = cellDetails[goalPos.y][goalPos.x].parent_y;
    let tempCol = cellDetails[goalPos.y][goalPos.x].parent_x;
    let tempMap = [...cellMap];
    
    while (!(
        cellDetails[tempRow][tempCol].parent_x === tempCol &&
        cellDetails[tempRow][tempCol].parent_y === tempRow
    )) {
        // let currentCell = tempMap[tempRow][tempCol];
        // let oldMaterial = MATERIALS[currentCell.type];
        // oldMaterial.isPath = true;
        // tempMap[tempRow][tempCol] = oldMaterial;

        tempMap[tempRow][tempCol].type = 'Wall';

        let newX = cellDetails[tempRow][tempCol].parent_x;
        let newY = cellDetails[tempRow][tempCol].parent_y;

        tempRow = newY;
        tempCol = newX;
    }

    console.log('finished');

    setCellMap(tempMap);
}
