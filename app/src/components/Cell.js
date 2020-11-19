import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './style/Cell.scss';

/* CELL --------------------------------------------------
    "Building block" of the program

    (material, gridMouseDown)
        material (int): 
            Material of the cell. Passed by parent Grid (see *material for more info)
        gridMouseDown (bool):
            Whether the user's mouse is down or not 

    material (int): 
        Tracks the material of the cell (see *material for more info)
    isSameDrag (bool): 
        Tracks whether or not the user's current drag is the same one or a different one. Keeps consistent UI.
        @NOTE: When mouse is down, onmouseenter fires twice. Tracking this prevents issues with that
------------------------------------------------------- */
function Cell({ material, gridMouseDown }) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    const [materialState, setMaterial] = useState(0); 
    const [isSameDrag, setSameDrag] = useState(false);

    /* ISSAMEDRAG EFFECT ----------------
        Helps track isSameDrag

        Pseudocode: 
            If mousedown is now false,
                Turn isSameDrag to false
    ---------------------------------- */
    useEffect(() => {
        if (!gridMouseDown) setSameDrag(false);
    }, [gridMouseDown]);

    /* ---------------------------- RENDER ---------------------------- */
    const classes = classNames({
        'Cell': true, 
        'Wall': (materialState === 1)
    });

    return (
        <div 
            className={classes}
            onMouseDown={() => (materialState !== material) ? setMaterial(material) : setMaterial(0)}
            onMouseEnter={() => {
                if (gridMouseDown && !isSameDrag) { 
                    setMaterial(material);
                    setSameDrag(true);
                };
            }} 
        >
        </div>
    );
}

export default Cell;

/* ---------------------------- NOTES ---------------------------- */
/*
    *material: { 
        0: no material,
        1: wall,
        2: goop,
    }
*/