import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { OPTIONS } from './options';

/* PLAYER --------------------------------------------------
------------------------------------------------------- */
function Player({ pos, setGridMouseDown }) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    const [, drag] = useDrag({
        item: { type: ItemTypes.PLAYER },
        isDragging: () => setGridMouseDown(false),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            canDrag: !!monitor.canDrag(),
        }),
    });

    return (
        <div 
            className="Player dnd-elem Cell-shape" // NOTE: Not an actual cell (absolutely positioned)
            ref={drag}
            style={{
                'top': pos.y,
                'left': pos.x,
                'width': `${OPTIONS.CELL_SIZE}px`,
                'height': `${OPTIONS.CELL_SIZE}px`,
            }}
        > </div>
    );
}

export default Player;

/* ---------------------------- NOTES ---------------------------- */
