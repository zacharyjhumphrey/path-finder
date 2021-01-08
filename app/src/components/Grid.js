import React, { useState, useEffect } from 'react';
import styleCorners from './styleCorners';
import './style/Grid.scss';
import GridCell from './GridCell';
import Player from './Player';
import Goal from './Goal';
import _ from 'lodash';
import { MATERIALS } from './Materials';
import { OPTIONS } from './options';
import AStar from './AStar';

function Grid({ currentMaterial, currentAlgorithm }) {
    const [gridMouseDown, setMouseDown] = useState(false);
    const [playerData, setPlayerData] = useState({
        pos: {
            x: OPTIONS.DEFAULT_PLAYER_CELL.x * OPTIONS.CELL_SIZE + OPTIONS.DEFAULT_PLAYER_CELL.x * OPTIONS.CELL_BORDER_SIZE * 2,
            y: OPTIONS.DEFAULT_PLAYER_CELL.y * OPTIONS.CELL_SIZE + OPTIONS.DEFAULT_PLAYER_CELL.y * OPTIONS.CELL_BORDER_SIZE * 2,
        },
        cell: OPTIONS.DEFAULT_PLAYER_CELL,
    });
    const [goalData, setGoalData] = useState({
        pos: {
            x: OPTIONS.DEFAULT_GOAL_CELL.x * OPTIONS.CELL_SIZE + OPTIONS.DEFAULT_GOAL_CELL.x * OPTIONS.CELL_BORDER_SIZE * 2, 
            y: OPTIONS.DEFAULT_GOAL_CELL.y * OPTIONS.CELL_SIZE + OPTIONS.DEFAULT_GOAL_CELL.y * OPTIONS.CELL_BORDER_SIZE * 2,
        },
        cell: OPTIONS.DEFAULT_GOAL_CELL,
    })

    const initGrid = () => {
        let map = Array.from({ length: OPTIONS.ROWS }, () => Array.from({ length: OPTIONS.COLS }, () => { 
            return {
                ...MATERIALS['Empty-Cell']
            }
        }));

        map.forEach((row, r) => {
            row.forEach((cellData, c) => {
                cellData.borderEdges = styleCorners(map, r, c);
            });
        });

        map[OPTIONS.DEFAULT_PLAYER_CELL.y][OPTIONS.DEFAULT_PLAYER_CELL.x] = MATERIALS['Player'];
        map[OPTIONS.DEFAULT_GOAL_CELL.y][OPTIONS.DEFAULT_GOAL_CELL.x] = MATERIALS['Goal'];

        return map;
    }

    const [cellMap, setCellMap] = useState([]); // 2D ARRAY OF CELLS

    useEffect(() => {
        setCellMap(() => initGrid());
    }, []);

    const changeCellMaterial = (x, y, newData) => {
        let newMap = [...cellMap];
        let currentCell = newMap[y][x];

        // Determining the material to change the cell into
        if (currentCell.type === 'Player') return;
        if (currentCell.type === 'Goal') return;

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

    const handleCellMouseDown = (x, y) => {
        let currentCell = cellMap[y][x];
        let newData = Object.assign({}, MATERIALS[currentMaterial]);

        
        if (currentCell.type === currentMaterial) newData = Object.assign({}, MATERIALS['Empty-Cell']);
        // let newMap = [...cellMap];
        // newMap[y][x] = newData;
        // setCellMap(newMap);
        changeCellMaterial(x, y, newData);
    }

    const handleCellMouseEnter = (x, y) => {
        if (!gridMouseDown) return; // Do nothing if the mouse is not down
    
        let currentCell = cellMap[y][x];
        let newData = Object.assign({}, MATERIALS[currentMaterial]);
        if (currentCell.type === currentMaterial) return; // Do nothing if the cell is of the same type
        
        changeCellMaterial(x, y, newData);  
    }

    const clearBoardSearch = () => {
        let newMap = [...cellMap];

        for (var i = 0; i < OPTIONS.ROWS; i++) {
            for (var j = 0; j < OPTIONS.COLS; j++) {
                newMap[i][j].isVisited = false;
                newMap[i][j].isPath = false;
            }
        }

        setCellMap(newMap);
    }

    const changePlayerCell = (newX, newY) => {
        // Change previous cell to normal cell
        changeCellMaterial(playerData.cell.x, playerData.cell.y, MATERIALS['Empty-Cell']);

        // Update the player cell
        setPlayerData({ ...playerData, 
            cell: {
                x: newX,
                y: newY,
            },
            pos: {
                x: OPTIONS.CELL_SIZE * newX + newX * OPTIONS.CELL_BORDER_SIZE * 2,
                y: OPTIONS.CELL_SIZE * newY + newY * OPTIONS.CELL_BORDER_SIZE * 2,
            }
        });

        // Set new cell to player cell
        changeCellMaterial(newX, newY, MATERIALS['Player']);
    }

    const changeGoalCell = (newX, newY) => {
        // Change previous cell to normal cell
        changeCellMaterial(goalData.cell.x, goalData.cell.y, MATERIALS['Empty-Cell']);

        // Update the goal cell
        setGoalData({
            ...goalData,
            cell: {
                x: newX,
                y: newY,
            },
            pos: {
                x: OPTIONS.CELL_SIZE * newX + newX * OPTIONS.CELL_BORDER_SIZE * 2,
                y: OPTIONS.CELL_SIZE * newY + newY * OPTIONS.CELL_BORDER_SIZE * 2,
            }
        });

        // Set new cell to goal cell
        changeCellMaterial(newX, newY, MATERIALS['Goal']);
    }

    const renderGrid = () => cellMap.map((row, r) => row.map((cellData, c) => { 
        let cellProps = {
            ...cellData,

            currentMaterial,
            gridMouseDown,
            r, c,
            handleMouseDown: handleCellMouseDown,
            handleMouseEnter: handleCellMouseEnter,
            changePlayerCell,
            changeGoalCell,
        }

        return <GridCell 
                    {...cellProps} 
                    key={r * OPTIONS.ROWS + c} 
                />
    }));

    return (
        <div className="App-Main">
            <div className="Grid-h">
                <div
                    className="Grid"
                    onMouseDown={(e) => { 
                        if (!e.target.classList.contains('Player')) setMouseDown(true);
                    }}
                    onMouseUp={() => setMouseDown(false)}
                    onMouseLeave={() => setMouseDown(false)}
                >
                    {renderGrid()}
                    <Player pos={playerData.pos} setGridMouseDown={setMouseDown} />
                    <Goal pos={goalData.pos} setGridMouseDown={setMouseDown} />
                </div>
            </div>

            <button onClick={() => {
                // Search 
                switch(currentAlgorithm) {
                    case ('A-Star'): 
                        AStar({
                            cellMap,
                            setCellMap,
                            goalPos: { ...goalData.cell },
                            playerPos: { ...playerData.cell },
                        })
                        break;
                    case ('Dijkstra'): 
                        console.log('Dijkstra');
                        break;
                    default: 
                        console.log('ERROR USING ALGORITHM. RELOAD PAGE');
                        break;
                }
                }}>FIND ME</button>
            <button onClick={() => clearBoardSearch()}>CLEAR ME</button>
        </div>
    );
}

// IDEA: I could create functions that return functions that edit just the one cellMap. Then I could find a way to tell if the Top Level function (that creates another function) has changed (or something of the sort)

export default Grid;