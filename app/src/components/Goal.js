import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { OPTIONS } from './options';

/* GOAL --------------------------------------------------
------------------------------------------------------- */
function Goal({ pos, setGridMouseDown }) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    const [, drag] = useDrag({
        item: { type: ItemTypes.GOAL },
        isDragging: () => setGridMouseDown(false),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
            canDrag: !!monitor.canDrag(),
        }),
    });

    return (
        <div
            className="Cell-shape dnd-elem Goal" // NOTE: Not an actual cell (absolutely positioned)
            ref={drag}
            style={{
                'top': pos.y,
                'left': pos.x,
                'width': `${OPTIONS.CELL_SIZE}px`,
                'height': `${OPTIONS.CELL_SIZE}px`,
                'borderRadius': '12px',
            }}
        > </div>
    );
}

export default Goal;

/* ---------------------------- NOTES ---------------------------- */
