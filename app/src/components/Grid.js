import React, { useState } from 'react';
import './style/Grid.scss';
import Cell from './Cell';
// import Player from './Player';

function Grid({ currentMaterial }) {
    const ROWS = 20;
    const COLS = 40;

    const [gridMouseDown, setMouseDown] = useState(false);

    const emptyCellData = {
        type: 'Empty-Cell',
        isPassable: true,
        // material: 0
    };
    const [cellMap, setCellMap] = useState(
        Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => emptyCellData))
    ); // 2D ARRAY OF CELLS

    /* -------------------------- FUNCTIONAL -------------------------- */
    // const [playerMouseDown, setPlayerMouseDown] = useState(false);

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div
            className="Grid"
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onMouseLeave={() => setMouseDown(false)}
        >
            {cellMap.map((row, r) => row.map((cellData, c) => <Cell {...{ currentMaterial, gridMouseDown, cellData, cellMap, r, c, setCellMap }} key={r * ROWS + c} />))}
    
        </div>
    );
}

export default Grid;

/* ---------------------------- NOTES ---------------------------- */
/*
    *cellMap: I don't really like the current implementation of this.
        I would rather store the cell and then reference it instead of creating 
        the data and passing it
*/