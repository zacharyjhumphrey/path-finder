import { OPTIONS } from '../options';

/* GETBLOCKEDCORNERS ------------
    Returns an array of 8 values. Indicating whether a cell is blocked by the two adjacent cells. 
    See GETSUCCESSORS for info on successor order in array

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
export function getBlockedCorners(cellMap, successors, passableMaterials) {
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
export function getSuccessors(x, y) {
    return [
        { x: x, y: y - 1 },
        { x: x - 1, y: y },
        { x: x + 1, y: y },
        { x: x, y: y + 1 },
        { x: x - 1, y: y - 1 },
        { x: x + 1, y: y - 1 },
        { x: x - 1, y: y + 1 },
        { x: x + 1, y: y + 1 },
    ]
}

/* ISUNBLOCKED ------------------
    Returns whether or not a node is capable of being passed

    NOTE: Combine this function with the blocked corner function?

    Return: 
        (bool): isUnblocked
------------------------------ */
export function isUnblocked(cellMap, x, y, materials) {
    if (!isValid(x, y)) return false; // Make sure the cell is valid
    return materials.includes(cellMap[y][x].type);
}

/* ISGOAL ------------------
    Returns whether or not a node is the goal

    Returns: 
        (bool): isGoal
------------------------------ */
export function isGoal(x, y, goal) {
    return (
        x === goal.x &&
        y === goal.y
    )
}

/* TRACEPATH ------------------
    Traces a path from the goal to the player

    Returns: 
        none
------------------------------ */
export function tracePath(cellDetails, goalPos, cellMap, setCellMap, animationTimer) {
    let tempRow = cellDetails[goalPos.y][goalPos.x].parent_y;
    let tempCol = cellDetails[goalPos.y][goalPos.x].parent_x;
    let tempMap = [...cellMap];

    console.log(`tempRow: ${tempRow}\ntempCol: ${tempCol}`);

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

/* ISVALID ----------------------
    Returns whether or not a node is within bounds

    Returns: 
        (bool): isValid
------------------------------ */
export function isValid(x, y) {
    return (
        x >= 0 && x < OPTIONS.COLS &&
        y >= 0 && y < OPTIONS.ROWS
    )
}
