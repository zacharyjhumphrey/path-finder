import React, { useState } from 'react';
import './style/Cell.scss';
import classNames from 'classnames';
import { createWall, emptyCell, becomePlayer } from './materialFunctions';

/* CELL --------------------------------------------------
    "Building block" of the program

    (currentMaterial, gridMouseDown, cellData, cellMap, r, c, setCellMap)
        currentMaterial (int):
            Material of the cell. Passed by parent Grid (see *material for more info)
        gridMouseDown (bool):
            Whether the user's mouse is down or not 
        cellData (obj): 
            Dictionary of the cell's data. 
            Holds default data on mount. 
            As this changes, so does the material of the cell
        updateCell (fn): 
            Function to update the value of any cell
        r (int): 
            Row of the current cell
        c (int): 
            Column of the current cell
------------------------------------------------------- */
function Cell({ currentMaterial, gridMouseDown, cellData, updateCell, r, c }) {
    const classes = classNames(
        `Cell-shape Cell ${cellData.type}`,
    )

    /* -------------------------- FUNCTIONAL -------------------------- */
    const [materialFunctions] = useState({
        'Empty-Cell': emptyCell, 
        'Wall': createWall,
        'Player': becomePlayer,
    }); // @NOTE Could be better optimized (see *materialArray)

    const changeMaterial = (mat) => {
        updateCell(c, r, mat);
    }

    /* ---------------------------- RENDER ---------------------------- */
    return (        
        <div 
            className={classes}
            onMouseDown={() => (cellData.type !== currentMaterial && cellData.type !== 'Player') ? materialFunctions[currentMaterial](changeMaterial) : materialFunctions['Empty-Cell'](changeMaterial)}
            onMouseEnter={() => {
                if (gridMouseDown && (currentMaterial !== cellData.type) && cellData.type !== 'Player') { 
                    materialFunctions[currentMaterial](changeMaterial)
                }
            }}
            draggable={false}
        > </div>
    );
}

export default Cell;

/* ---------------------------- NOTES ---------------------------- */
/*
    *materialArray: 
        If there was a way to have functions be the value for select fields, I could pass the function instead of the name of the function and call that function here. 
        This would give the application more consistency between controls and the cell
        However, React won't let me pass functions into the values of forms
*/