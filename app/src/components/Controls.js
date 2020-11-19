import React from 'react';
import './style/Controls.scss';

function Controls({ controls, setControls }) {
    /* -------------------------- FUNCTIONAL -------------------------- */

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div className="Controls">
            <label htmlFor="materials">Choose a material: </label>
            <select 
                name="materials" 
                id="materials"
                onChange={(e) => setControls({ ...controls, material: parseInt(e.target.value) })}
            >
                <option value={0}>Empty Cell</option>
                <option value={1}>Wall</option>
            </select>
        </div>
    );
}

export default Controls;

/* ---------------------------- NOTES ---------------------------- */
