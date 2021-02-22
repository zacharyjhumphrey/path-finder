import React, { useState } from 'react';
import './style/Controls.scss';

function Controls({ currentMaterial, setCurrentMaterial, currentAlgorithm, setCurrentAlgorithm, addPassableMaterial, removePassableMaterial }) {
    /*
        currentPanel: 
            0: material,
            1: algorithm,
            2: player
    */
    const [currentPanel, setCurrentPanel] = useState(0); 
    const [canPassThroughWater, setCanPassThroughWater] = useState(false);

    return (
        <div className="Controls">
            {currentPanel === 0 &&
                <div
                    className="material-panel Panel"
                >
                    <select
                        className="controls-select-box"
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
                        <option value={'Water'}>
                            Water
                        </option>
                    </select>
                </div>
            }

            {currentPanel === 1 &&
                <div
                    className="algorithm-panel Panel"
                >
                    <select
                        className="controls-select-box"
                        name="algorithms"
                        id="algorithms"
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
                    <label 
                        htmlFor="canPassThroughWater"
                        className={`controls-checkbox ${(canPassThroughWater) ? "controls-checkbox-checked" : ""}`}
                    >
                        Walks on Water 
                        <input
                            type="checkbox"
                            // value="canPassThroughWater" 
                            name="canPassThroughWater"
                            id="canPassThroughWater"
                            defaultChecked={canPassThroughWater}
                            onChange={e => {
                                if (e.target.checked) { setCanPassThroughWater(true); addPassableMaterial("Water");}
                                else { setCanPassThroughWater(false); removePassableMaterial("Water"); }
                            }} />
                    </label>
                </div>
            }

            <nav className="choose-panel">
                <div
                    className={`select-panel-option material-panel-option ${currentPanel === 0 ? "selected-panel-option" : null}`}
                    onClick={() => setCurrentPanel(0)}
                >
                    Materials
                    <div className="panel-option-underline material-underline"></div>
                </div>

                <div
                    onClick={() => setCurrentPanel(1)}
                    className={`select-panel-option algorithm-panel-option ${currentPanel === 1 ? "selected-panel-option" : null}`}
                >
                    Algorithm

                    <div className="panel-option-underline algorithm-underline"></div>
                </div>

                <div
                    onClick={() => setCurrentPanel(2)}
                    className={`select-panel-option player-panel-option ${currentPanel === 2 ? "selected-panel-option" : null}`}
                >
                    Player

                    <div className="panel-option-underline player-underline"></div>
                </div>
            </nav>
        </div>
    );
}

export default Controls;

/* ---------------------------- NOTES ---------------------------- */
