import React from 'react';
import './style/Cell.scss';
import classNames from 'classnames';
import { OPTIONS } from './options';
/* CELL --------------------------------------------------
    "Building block" of the program

    (cellData, r, c, updateCell)
        cellData (obj): 
            Object with the cell's data. 
            Holds default data on mount. 
            As this changes, so should the appearance of the cell
        updateCell (fn): 
            Function to update the value of any cell
            Should have (c, r) passed into functions that change this cell
        r (int): 
            Row of the current cell
        c (int): 
            Column of the current cell
        currentMaterial (string): 
            Current material that the program is changing data into
------------------------------------------------------- */
function Cell(props) {
    const classes = classNames(
        `Cell-shape ${props.cellData.type}`, {
            'Path': props.cellData.isPath
        }
    );

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div
            className={classes}
            onMouseDown={() => props.dispatch({ type: 'TEST' })}
            // onMouseDown={() => props.handleMouseDown(props.c, props.r, props.currentMaterial)}
            // onMouseEnter={() => props.handleMouseEnter(props.c, props.r, props.currentMaterial)}
            draggable={false}
            style={{
                'width': `${OPTIONS.CELL_SIZE}px`,
                'height': `${OPTIONS.CELL_SIZE}px`,
                'borderRadius': `${props.cellData.borderEdges.tl ? 0 : 10}px ${props.cellData.borderEdges.tr ? 0 : 10}px ${props.cellData.borderEdges.br ? 0 : 10}px ${props.cellData.borderEdges.bl ? 0 : 10}px`
            }}
        > </div>
    );
}

export default Cell;

/* NOTES
    1. I need to pass handleMouseDown and handleMouseEnter into this function instead of updateCell
    2. ISSUE WITH THING: Does changing one value in an array cause the whole array to update bc that is the assumption that I am basing all of this off of
*/
