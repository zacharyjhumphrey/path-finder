import React, { useState } from 'react';
import classNames from 'classnames';
import './style/Player.scss';

/* PLAYER --------------------------------------------------
------------------------------------------------------- */
function Player({ gridMousedown, setPlayerMouseDown }) {
    const c = classNames({
        'Player Hollow-Cell': true
    });

    /* -------------------------- FUNCTIONAL -------------------------- */
    const handleMouseMove = (e) => {
        
    }

    /* ---------------------------- RENDER ---------------------------- */
    return (
        <div 
            className={c}
            onMouseDown={() => setPlayerMouseDown(true)}
            onMouseUp={() => setPlayerMouseDown(false)}  
            onMouseMove={(e) => handleMouseMove(e)}     
        > </div>
    );
}

export default Player;

/* ---------------------------- NOTES ---------------------------- */
