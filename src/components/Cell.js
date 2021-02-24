import React, { useEffect, useState } from 'react';
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
    const [isPath, setPath] = useState(false);
    const classes = classNames(
        `Cell-shape ${props.type}`, {
            'Path': isPath,
            'Visited': props.isVisited,
        }
    );

    // Wait to add the path class until the animation is done
    useEffect(() => {
        if (!props.isPath) return;

        const timer = setTimeout(() => {
            setPath(true);
        }, props.totalPathingDuration * 1000);
        return () => clearTimeout(timer);
    }, [props.totalPathingDuration, props.isPath]);

    // Remove path when board is cleared
    useEffect(() => {
        if (!props.isPath) setPath(false);
    }, [props.isPath])

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div
            className={classes}
            onMouseDown={() => props.handleMouseDown(props.c, props.r, props.currentMaterial)}
            onMouseEnter={() => props.handleMouseEnter(props.c, props.r, props.currentMaterial)}
            draggable={false}
            style={{
                'width': `${OPTIONS.CELL_SIZE}px`,
                'height': `${OPTIONS.CELL_SIZE}px`,
                'borderRadius': `
                    ${props.borderEdges.tl ? 0 : 10}px 
                    ${props.borderEdges.tr ? 0 : 10}px 
                    ${props.borderEdges.br ? 0 : 10}px 
                    ${props.borderEdges.bl ? 0 : 10}px`,

                // Animate in sequence with the other visited cells until isPath is true, then change all paths at once
                'transitionDelay': `${(!isPath) ? props.transitionDelay : 0.5}s`,
            }}
        > </div>
    );
}

export default Cell;