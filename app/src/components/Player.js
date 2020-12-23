import React from 'react';
import { useDrag } from 'react-dnd';
// import './style/Player.scss';
import { ItemTypes } from './ItemTypes';

// OOO: 
// By default: 
    // The player will be aligned to whatever cell has the class "Player-Cell"
// When the user clicks their mouse down on the player: 
    // Mousemove will move the player around the grid
    // Mousemove will also track whether or not the mouse has entered a new cell. When it does
        // That cell will have the class Player-Cell
        // On gridMouseUp/gridMouseLeave the player will align back to Player-Cell

// Moving the player around 
    // onMouseDown, set mousedown to true 
    // onMouseMove, if mousedown is true 
        // add to the position by e.pageX - prevX (& the same for y)

// React DND 
    // Set a drop for each cell
        // On drop, set the cellPosition ({ x, y })
    // Drag the player on the Grid

/* PLAYER --------------------------------------------------
------------------------------------------------------- */
function Player({ pos, setGridMouseDown }) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    /* DRAG HOOK ----------------------------

    -------------------------------------- */
    const [, drag] = useDrag({
        item: { type: ItemTypes.PLAYER },
        // isDragging: () => setGridMouseDown(false),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            canDrag: !!monitor.canDrag(),
        }),
    });

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div 
            className="Cell-shape Player" // NOTE: Not an actual cell (absolutely positioned)
            ref={drag}
            style={{
                'top': pos.y,
                'left': pos.x,
                'border-radius': '12px'
            }}
        > </div>
    );
}

export default Player;

/* ---------------------------- NOTES ---------------------------- */
