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
    // @NEXT CHECK MY WORK HERE
    // console.log(prevProps.cellData.borderEdges === nextProps.cellData.borderEdges);
    // if (prevProps.cellData.borderEdges !== nextProps.cellData.borderEdges) {
    //     console.log("Border edges don't match. Rerendering the cell");
    // }

    if (
        prevProps.cellData === nextProps.cellData 
        && prevProps.currentMaterial === nextProps.currentMaterial
        && prevProps.gridMouseDown === nextProps.gridMouseDown
        && prevProps.cellData.borderEdges === nextProps.cellData.borderEdges
    ) {
        return true;
    }
    
    return false;
});

// CREDIT: https://www.codegrepper.com/code-examples/delphi/check+if+two+dictionaries+are+equal+javascript
function checkEquivalentObjects(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

export default MemoCell;

/* ---------------------------- NOTES ---------------------------- */
