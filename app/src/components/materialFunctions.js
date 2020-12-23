export function createWall(setMaterial) {
    const wallMaterial = {
        type: 'Wall',
        isPassable: false,
        borderEdges: {
            tl: false,
            tr: false,
            br: false,
            bl: false,
        },
    }
    setMaterial(wallMaterial);
}

export function emptyCell(setMaterial) {
    const cellMaterial = {
        type: 'Empty-Cell',
        isPassable: true,
        borderEdges: {
            tl: true,
            tr: true,
            br: true,
            bl: true,
        },
    }
    setMaterial(cellMaterial);
}

export function becomePlayer(setMaterial) {
    const playerMaterial = {
        type: 'Player',
        isPassable: null,
        borderEdges: {
            tl: false,
            tr: false,
            br: false,
            bl: false,
        },
    }
    setMaterial(playerMaterial);
}