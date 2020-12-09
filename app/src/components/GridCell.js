import React from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from './ItemTypes';
import './style/Cell.scss';
import Cell from './Cell';

/* GRIDCELL --------------------------------------------------
    This holds the cells and performs actions on the cell if they are related to drag and drop functions (such as the player)
------------------------------------------------------- */
function GridCell(props) {

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.PLAYER,
        canDrop: () => props.cellData.type === 'Empty-Cell',
        drop: () => props.changePlayerCell(props.c, props.r),
        // drop: (item, monitor) => console.log(monitor),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    /* ---------------------------- RENDER ---------------------------- */
    const classes = classNames('Grid-Cell');

    return (
        <div
            className={classes}
            ref={drop}
            style={{
                'filter': (isOver && canDrop) ? 'brightness(.5)' : 'brightness(1)'
            }}
        > 
            <Cell {...props}/>
        </div>
    );
}

/* MEMO
    If the previous data is the same as the next data, don't update the element
    Else, change da bitch
*/
const MemoCell = React.memo(GridCell, (prevProps, nextProps) => {
    if (
        prevProps.cellData === nextProps.cellData 
        && prevProps.currentMaterial === nextProps.currentMaterial
        && prevProps.gridMouseDown === nextProps.gridMouseDown
        ) {
            return true;
    }
        
    return false;
});


export default MemoCell;

/* ---------------------------- NOTES ---------------------------- */
