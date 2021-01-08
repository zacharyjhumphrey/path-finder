import React from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { ItemTypes } from './ItemTypes';
import './style/Cell.scss';
import Cell from './Cell';
// import useTraceUpdate from './useTraceUpdate';

/* GRIDCELL --------------------------------------------------
    This holds the cells and performs actions on the cell if they are related to drag and drop functions (such as the player)
------------------------------------------------------- */
function GridCell(props) {
    // useTraceUpdate(props);
    // console.log('gridcell rerender')
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [ItemTypes.PLAYER, ItemTypes.GOAL],
        canDrop: () => props.type === 'Empty-Cell',
        drop: (item) => {
            if (item.type === ItemTypes.PLAYER) props.changePlayerCell(props.c, props.r);
            else if (item.type === ItemTypes.GOAL) props.changeGoalCell(props.c, props.r);
        },
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
            draggable={false}
            ref={drop}
            style={{
                'filter': (isOver && canDrop) ? 'brightness(.5)' : 'brightness(1)'
            }}
        > 
            <Cell 
                {...props} 
            />
        </div>
    );
}

// export default GridCell;

/* MEMO
    If the previous data is the same as the next data, don't update the element
    Else, change da bitch
*/
const MemoCell = React.memo(GridCell, (prevProps, nextProps) => {  
    if (
        // ACTUALLY REQUIRED FOR THE CELL
        prevProps.type === nextProps.type
        && prevProps.borderEdges === nextProps.borderEdges
        && prevProps.isVisited === nextProps.isVisited
        && prevProps.isPath === nextProps.isPath

        // @NOTE: I have no idea how to both use React.memo and update functions without updating them when cellMap (the giant Grid representation), so this is the next best thing. Same performance, but really, really annoying to look at. Any help is appreciated 
        // MOUSEDOWN/MOUSEMOVE DEP
        && prevProps.currentMaterial === nextProps.currentMaterial

        // MOUSEMOVE DEP
        && prevProps.gridMouseDown === nextProps.gridMouseDown
    ) {
        return true;
    }

    return false;
});

export default MemoCell;


/* ---------------------------- NOTES ---------------------------- */
/*
    1. I really want to find a way to update cells when their functions are updated besides passing dependencies into memo.
        This leads to some sloppy code
        I want to use useCallback, but (A) I don't know how to use it and (B) it seems like it would update everytime cellMap updates which would lead to very, very, very slow load times
    2. I think that at some point I should look into combining GridCell and Cell bc differentiating between the two may get hard in the future
        The problem is that I still need GridCell to hold onto things, and if it becomes just a cell I might not be able to do that
*/