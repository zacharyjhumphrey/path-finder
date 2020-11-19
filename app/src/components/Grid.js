import React, { useState } from 'react';
import './style/Grid.scss';
import Cell from './Cell';

function Grid({ material }) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    const [gridMouseDown, setMouseDown] = useState(false);
    console.log(material);

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div
            className="Grid"
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onMouseLeave={() => setMouseDown(false)}
        >
            <Cell {...{ material, gridMouseDown }}/>
            <Cell {...{ material, gridMouseDown }} />
            <Cell {...{ material, gridMouseDown }} />
            <Cell {...{ material, gridMouseDown }} />
            <Cell {...{ material, gridMouseDown }} />
            <Cell {...{ material, gridMouseDown }} />
            <Cell {...{ material, gridMouseDown }} />
            <Cell {...{ material, gridMouseDown }} />
            <Cell {...{ material, gridMouseDown }} />
            <Cell {...{ material, gridMouseDown }} />
        </div>
    );
}

export default Grid;
