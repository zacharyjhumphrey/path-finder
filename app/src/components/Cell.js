import React, { useEffect, useState } from 'react';
import './style/Cell.scss';
import createWall from './createWall';
import emptyCell from './emptyCell';

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
        cellMap (2d arr): 
            Map of cells holding the information of each cell
            (This cell corresponds to [r][c])
        r (int): 
            Row of the current cell
        c (int): 
            Column of the current cell
        setCellMap (fn): 
            Function that changes the map of the cells.
            Used to update this individual cell

    isSameDrag (bool): 
        Tracks whether or not the user's current drag is the same one or a different one. Keeps consistent UI.
        @NOTE: When mouse is down, onmouseenter fires twice. Tracking this prevents issues with that
------------------------------------------------------- */
function Cell({ currentMaterial, gridMouseDown, cellData, cellMap, r, c, setCellMap }) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    const [isSameDrag, setSameDrag] = useState(false);

    /* ISSAMEDRAG EFFECT ----------------
        Helps track isSameDrag

        Pseudocode: 
            If mousedown is now false,
                Turn isSameDrag to false
    ---------------------------------- */
    useEffect(() => {
        if (!gridMouseDown) setSameDrag(false);
    }, [gridMouseDown]);

    const [materialFunctions] = useState({
        'Empty-Cell': emptyCell, 
        'Wall': createWall,
    }); // @NOTE Could be better optimized (see *materialArray)

    const changeMaterial = (mat) => {
        let newMap = [...cellMap];
        newMap[r][c] = mat;
        setCellMap(newMap);
    }

    /* ---------------------------- RENDER ---------------------------- */
    return (        
        <div 
            className={`Cell Hollow-Cell ${cellData.type}`}
            onMouseDown={() => (cellData.type !== currentMaterial) ? materialFunctions[currentMaterial](changeMaterial) : materialFunctions['Empty-Cell'](changeMaterial)}
            onMouseEnter={() => {
                if (gridMouseDown && !isSameDrag) { 
                    materialFunctions[currentMaterial](changeMaterial);
                    setSameDrag(true);
                };
            }}
        > </div>
    );
}

export default Cell;

/* ---------------------------- NOTES ---------------------------- */
/*
    *material: { 
        0: no material,
        1: wall,
        2: goop,
    }

    *materialArray: 
        If there was a way to have functions be the value for select fields, I could pass the function instead of the name of the function and call that function here. 
        This would give the application more consistency between controls and the cell
        However, React won't let me pass functions into the values of forms
*/