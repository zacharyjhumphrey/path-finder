import React, { useState } from 'react';
import './style/Controls.scss';

function Controls({ currentMaterial, setCurrentMaterial, currentAlgorithm, setCurrentAlgorithm }) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    /*
        currentPanel: 
            0: material,
            1: algorithm,
            2: player
    */
    const [currentPanel, setCurrentPanel] = useState(0); 

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div className="Controls">
            {currentPanel === 0 &&
                <div
                    className="material-panel Panel"
                >
                    <label htmlFor="materials">Choose a material: </label>
                    <select
                        name="materials"
                        id="materials"
                        onChange={(e) => setCurrentMaterial(e.target.value)}
                        defaultValue={currentMaterial}
                    >
                        <option value={'Empty-Cell'}>
                            Empty Cell
                        </option>
                        <option value={'Wall'}>
                            Wall
                        </option>
                    </select>
                </div>
            }

            {currentPanel === 1 &&
                <div
                    className="algorithm-panel Panel"
                >
                    <label htmlFor="materials">Choose a material: </label>
                    <select
                        name="materials"
                        id="materials"
                        onChange={(e) => setCurrentAlgorithm(e.target.value)}
                        defaultValue={currentAlgorithm}
                    >
                        <option value={'A-Star'}>
                            A-Star
                        </option>
                        <option value={'Dijkstra'}>
                            Dijkstra's Algorithm
                        </option>
                    </select>
                </div>
            }

            {currentPanel === 2 &&
                <div
                    className="player-panel Panel"
                >
                    OPTIONS FOR PLAYER
                </div>
            }

            <nav className="choose-panel">
                <span
                    className="select-panel-option material-panel-option"
                    onClick={() => setCurrentPanel(0)}
                >
                    Materials
                </span>

                <span
                    onClick={() => setCurrentPanel(1)}
                    className="select-panel-option algorithm-panel-option"
                >
                    Algorithm
                </span>

                <span
                    onClick={() => setCurrentPanel(2)}
                    className="select-panel-option player-panel-option"
                >
                    Player
                </span>
            </nav>
        </div>
    );
}

export default Controls;

/* ---------------------------- NOTES ---------------------------- */
