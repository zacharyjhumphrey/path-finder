import { OPTIONS } from '../options';

// @PICKUP Breaking does not break both loops, and because of of that the algorithm finds the goal 3 times

const FLT_MAX = 40000;
const INCREMENT_ANIMATION = 0.02;

export default function AStar ({ cellMap, setCellMap, goalPos, playerPos, passableMaterials }) {
    let openList = createOpenList(playerPos); // @FIX GIVE IT THE PROPER DATA STRUCTURE
    let closedList = createClosedList(playerPos);
    let cellDetails = createCellDetails(playerPos);
    let foundGoal = false;
    let animationTimer = 0;

    // While the list of available cells is not empty,
    // AND the goal is not found
    while (openList.length > 0 && !foundGoal) {
        // Get the info on the first node in the array
        // This loop will evaluate all of the information from the array        
        let pIdx = findLowestF(openList);
        let p = openList[pIdx]; 
        let parent = cellDetails[p.y][p.x];
        openList.splice(pIdx, 1);
        closedList[p.y][p.x] = true;

        let successors = getSuccessors(p.x, p.y);

        // If two blocks are diagonal to each other, the corner piece that connects them is also blocked although not visually
        let blockedCorners = getBlockedCorners(cellMap, successors, passableMaterials);

        // Loop through the 8 adjacent cells
        for (let i = 0; i < 8; i++) {
            // animationTimer += INCREMENT_ANIMATION;
            let nodeX = successors[i].x,
                nodeY = successors[i].y;

            let isBlockedCorner = blockedCorners[i];

            // Calculate a cell's f-value if it is within map bounds 
            // AND it is a passable cell 
            // AND it has not been visited before
            if ( isValid(nodeX, nodeY) ) {
                if (
                    isUnblocked(cellMap, nodeX, nodeY, passableMaterials) &&
                    !closedList[nodeY][nodeX] && 
                    !isBlockedCorner
                ) {
                    // GOAL CASE 
                    if (isGoal(nodeX, nodeY, goalPos)) {
                        foundGoal = true;

                        cellDetails[nodeY][nodeX].parent_x = p.x;
                        cellDetails[nodeY][nodeX].parent_y = p.y;

                        tracePath(cellDetails, goalPos, cellMap, setCellMap, animationTimer);
                        break; // @NOTE: THIS ALSO NEEDS TO BREAK OUT OF THE WHILE LOOP, NOT SURE IF IT WILL
                    }
                    // NORMAL CASE (GENERIC, AVAILABLE CELL)
                    else {
                        // Create variables
                        let node = cellDetails[nodeY][nodeX];
                        let moveCost = Math.sqrt(Math.pow(Math.abs(nodeX - p.x), 2) + Math.pow(Math.abs(nodeY - p.y), 2))
                        let newG = parent.g + moveCost; // CALC G VALUE
                        let newH = getHValue(nodeX, nodeY, goalPos); // CALC H VALUE 
                        let newF = newG + newH;

                        if (
                            node.f === FLT_MAX ||
                            node.f > newF
                        ) {
                            openList.push({ f: newF, x: nodeX, y: nodeY });

                            // Show that this cell has been visited
                            let newMap = [...cellMap];
                            let newCell = newMap[nodeY][nodeX];
                            newCell.isVisited = true;
                            newCell.transitionDelay = animationTimer;
                            newMap[nodeY][nodeX] = newCell;

                            setCellMap(newMap);

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

        // Delay the animation of the next cell's children
        animationTimer += INCREMENT_ANIMATION;
    }

    if (!foundGoal) console.log('ERROR: FAILED TO FIND GOAL');
}

/* GETBLOCKEDCORNERS ------------
    Returns an array of 8 values. Indicating whether a cell is blocked by the two adjacent cells. 

    For example: 
        O O O
        O C X
        O X O

        C: Current Cell
        O: Open Cell
        X: Blocked Cell

        In this example, the bottom right corner is also inaccessible because the corner on the right and bottom are blocking the path from C to O. However, I still want to be able to move horizontally in the search, so this allows for both approaches. 

    Returns:
        idx (int): Index of the lowest f value in the list
--------------------------- */
function getBlockedCorners(cellMap, successors, passableMaterials) {
    let topUnblocked = isUnblocked(cellMap, successors[0].x, successors[0].y, passableMaterials),
        leftUnblocked = isUnblocked(cellMap, successors[1].x, successors[1].y, passableMaterials),
        rightUnblocked = isUnblocked(cellMap, successors[2].x, successors[2].y, passableMaterials),
        bottomUnblocked = isUnblocked(cellMap, successors[3].x, successors[3].y, passableMaterials);

    return [
        false, // top
        false, // left
        false, // right
        false, // bottom
        !(topUnblocked || leftUnblocked), // top left corner
        !(topUnblocked || rightUnblocked), // top right corner
        !(bottomUnblocked || leftUnblocked), // bottom left corner
        !(bottomUnblocked || rightUnblocked) // bottom right corner
    ]
}

/* FINDLOWESTF ------------
    Finds the value in a list with the lowest f value

    Returns: 
        idx (int): Index of the lowest f value in the list
--------------------------- */
function findLowestF(arr) {
    let lowestF = FLT_MAX;
    let fIdx = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].f < lowestF) {
            lowestF = arr[i].f;
            fIdx = i;
        }
    }

    return fIdx;
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

    Returns: [
        top,
        left,
        right,
        bottom,
        top-left,
        top-right,
        bottom-left,
        bottom-right,
    ]
------------------------------- */
function getSuccessors(x, y) {
    return [
        { x: x    , y: y - 1 }, 
        { x: x - 1, y: y     }, 
        { x: x + 1, y: y     }, 
        { x: x    , y: y + 1 },
        { x: x - 1, y: y - 1 }, 
        { x: x + 1, y: y - 1 }, 
        { x: x - 1, y: y + 1 }, 
        { x: x + 1, y: y + 1 }, 
    ]
}

/* GETHVALUE --------------------
    Generates the h-value (distance between the node and the goal) for a given node
------------------------------ */
function getHValue(x, y, goal) {
    return Math.sqrt(Math.pow(x - goal.x, 2) + Math.pow(y - goal.y, 2));
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
function isUnblocked(cellMap, x, y, materials) {
    console.log('here');
    if (!isValid(x, y)) return false; // Make sure the cell is valid
    return materials.includes(cellMap[y][x].type);
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

function tracePath(cellDetails, goalPos, cellMap, setCellMap, animationTimer) {
    let tempRow = cellDetails[goalPos.y][goalPos.x].parent_y;
    let tempCol = cellDetails[goalPos.y][goalPos.x].parent_x;
    let tempMap = [...cellMap];
    
    while (!(
        cellDetails[tempRow][tempCol].parent_x === tempCol &&
        cellDetails[tempRow][tempCol].parent_y === tempRow
    )) {
        // EDIT DATA TO SHOW THAT THE CELL HAS BEEN VISITED
        tempMap[tempRow][tempCol].isPath = true;
        tempMap[tempRow][tempCol].totalPathingDuration = animationTimer;

        let newX = cellDetails[tempRow][tempCol].parent_x;
        let newY = cellDetails[tempRow][tempCol].parent_y;

        tempRow = newY;
        tempCol = newX;
    }

    setCellMap(tempMap);
    
    console.log('FINISHED FINDING/DRAWING PATH');
}
