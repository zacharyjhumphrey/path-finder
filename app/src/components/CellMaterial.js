import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

/* CELLMATERIAL -----------------------------------------
    Parent class of all of the "utilities" (or materials) of the program. 

    (material, gridMouseDown)
        material (int): 
            Material of the cell. Passed by parent Grid (see *material for more info)
        gridMouseDown (bool):
            Whether the user's mouse is down or not 
------------------------------------------------------- */
function CellMaterial({ props }) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    const [materialState, setMaterial] = useState(0);
    const [isPassable, setPassable] = useState(true);

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div>
        </div>
    );
}

export default CellMaterial;

/* ---------------------------- NOTES ---------------------------- */
