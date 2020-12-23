import React, { useState } from 'react';
import styleCorners from './styleCorners';
import './style/Grid.scss';
import GridCell from './GridCell';
import Player from './Player';
import _ from 'lodash';

// @IDEA: WAIT FOR MOUSEDOWN AND THEN MOUSEMOVE SO THAT ALL OF THE CELLS DON'T RENDER EVERY TIME THE USER CLICKS. CLICKING REPEATEDLY SLOWS THE PROGRAM DOWN A BUNCH

// @NOTE: PACKAGE THIS DEFUALT DATA INTO A JSON
const DEFAULT_CELL_DATA = {
    type: 'Empty-Cell',
    isPassable: true,
    borderEdges: null, // Must be set dynamically
};
const DEFAULLT_PLAYER_CELL = {
    x: 0, 
    y: 0,
};

const MATERIALS = {
    'Wall': {
        type: 'Wall',
        isPassable: false,
        borderEdges: {
            tl: false,
            tr: false,
            br: false,
            bl: false,
        }
    },
    'Player': {
        type: 'Player-Cell',
        isPassable: null,
        borderEdges: {
            tl: false,
            tr: false,
            br: false,
            bl: false,
        }
    },
    'Empty-Cell': {
        type: 'Empty-Cell',
        isPassable: true,
        borderEdges: {
            tl: true,
            tr: true,
            br: true,
            bl: true,
        }
    }
}

function Grid({ currentMaterial }) {
    const ROWS = 20;
    const COLS = 40;

    const [gridMouseDown, setMouseDown] = useState(false);
    const [playerCell, setPlayerCell] = useState(DEFAULLT_PLAYER_CELL);
    const [playerPosition, setPlayerPosition] = useState(DEFAULLT_PLAYER_CELL); // { x, y }

    const initGrid = () => {
        let map = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => { 
            return {
                ...DEFAULT_CELL_DATA
            }
        }));

        map.forEach((row, r) => {
            row.forEach((cellData, c) => {
                cellData.borderEdges = styleCorners(map, r, c);
            });
        });

        map[DEFAULLT_PLAYER_CELL.y][DEFAULLT_PLAYER_CELL.x] = MATERIALS['Player'];

        return map;
    }

    const [cellMap, setCellMap] = useState(() => initGrid()); // 2D ARRAY OF CELLS

    const changePlayerCell = (x, y) => {
        let newMap = [...cellMap];

        // Change previous cell to normal cell
        newMap[playerCell.y][playerCell.x] = MATERIALS['Empty-Cell'];

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

        // Set those updates into the cell map
        newMap[y][x] = newData;

        // // Dynamic data (values that need to be updated when data is changed)
        // Update primarily changed cell's borders   
        newMap[y][x].borderEdges = styleCorners(newMap, y, x);

        // Update the cells around it
        for (var i = -1; i < 2; i++) {
            if (_.inRange(x + i, 0, cellMap[0].length)) {
                for (var j = -1; j < 2; j++) {
                    if (_.inRange(y + j, 0, cellMap.length) && !(j === 0 && i === 0)) {
                        // @FIX: I have to change all of the cell's data in order for React to notice that cellprops.borderedges have changed
                        newMap[y + j][x + i] = { ...newMap[y + j][x + i], borderEdges: styleCorners(newMap, y + j, x + i) };
                    }
                }
            }
        }

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
            isPlayer: (c === playerCell.x && r === playerCell.y),

            test: (r * ROWS + c === 4)
        }

        return <GridCell 
                    {...cellProps} 
                    key={r * ROWS + c} 
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