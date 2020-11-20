import React from 'react';
import './style/Controls.scss';

function Controls({ currentMaterial, setCurrentMaterial }) {
    /* -------------------------- FUNCTIONAL -------------------------- */

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div className="Controls">
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
    );
}

export default Controls;

/* ---------------------------- NOTES ---------------------------- */
