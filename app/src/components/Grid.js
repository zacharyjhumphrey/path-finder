import React, { useState } from 'react';
import './style/Grid.scss';
import GridCell from './GridCell';
import Player from './Player';

// @NOTE: PACKAGE THIS DEFUALT DATA INTO A JSON
const DEFAULT_CELL_DATA = {
    type: 'Empty-Cell',
    isPassable: true,
};
const DEFAULLT_PLAYER_CELL = {
    x: 0, 
    y: 0,
};

const MATERIALS = {
    'Wall': {
        type: 'Wall',
        isPassable: false,
    },
    'Player': {
        type: 'Player-Cell',
        isPassable: null,
    },
    'Empty-Cell': {
        type: 'Empty-Cell',
        isPassable: true,
    }
}

function Grid({ currentMaterial }) {
    const ROWS = 20;
    const COLS = 40;

    const [gridMouseDown, setMouseDown] = useState(false);
    const [playerCell, setPlayerCell] = useState(DEFAULLT_PLAYER_CELL);
    const [playerPosition, setPlayerPosition] = useState(DEFAULLT_PLAYER_CELL); // { x, y }

    const initGrid = () => {
        let map = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => DEFAULT_CELL_DATA));

        map[DEFAULLT_PLAYER_CELL.y][DEFAULLT_PLAYER_CELL.x] = MATERIALS['Player'];

        return map;
    }

    const [cellMap, setCellMap] = useState(initGrid()); // 2D ARRAY OF CELLS

    const changePlayerCell = (x, y) => {
        let newMap = [...cellMap];

        // Change previous cell to normal cell
        newMap[playerCell.y][playerCell.x] = DEFAULT_CELL_DATA;

        // Update the player cell
        setPlayerCell({ x: x, y: y });

        // Set new cell to player cell
        newMap[y][x] = MATERIALS['Player'];

        // Set player position @NOTE: Optimize this later
        let playerX = document.getElementsByClassName('Cell-shape')[0].getBoundingClientRect().width * x;
        let playerY = document.getElementsByClassName('Cell-shape')[0].getBoundingClientRect().height * y;
        setPlayerPosition({
            x: playerX,
            y: playerY,
        });
        
        // Update map
        setCellMap(newMap);
    }

    const updateCell = (x, y, newData) => {
        let newMap = [...cellMap];
        newMap[y][x] = newData;
        setCellMap(newMap);
    }

    /* -------------------------- FUNCTIONAL -------------------------- */
    // const [playerMouseDown, setPlayerMouseDown] = useState(false);
    const renderGrid = () => cellMap.map((row, r) => row.map((cellData, c) => { 
        let cellProps = {
            // Grid states/functions being passed down 
            currentMaterial, 
            gridMouseDown, 
            changePlayerCell, 
            
            updateCell,
            
            // Info related to this specific cell
            cellData, r, c, 

            // Properties that will change based on initGrid
            isPlayer: (c === playerCell.x && r === playerCell.y)
        }

        return <GridCell 
                    {...cellProps} 
                    key={r * ROWS + c} 
                    onMouseDown={() => console.log('Mouse is moving')}
                />
    }));

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div
            className="Grid"
            onMouseDown={(e) => { if (!e.target.classList.contains('Player')) setMouseDown(true); }}
            onMouseUp={() => setMouseDown(false)}
            onMouseLeave={() => setMouseDown(false)}
        >
            {renderGrid()}
            <Player pos={playerPosition} setGridMouseDown={setMouseDown} />

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