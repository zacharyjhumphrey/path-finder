export function createWall(setMaterial) {
    const wallMaterial = {
        type: 'Wall',
        isPassable: false,
    }
    setMaterial(wallMaterial);
}

export function emptyCell(setMaterial) {
    const cellMaterial = {
        type: 'Empty-Cell',
        isPassable: true,
    }
    setMaterial(cellMaterial);
}

export function becomePlayer(setMaterial) {
    const playerMaterial = {
        type: 'Player',
        isPassable: null,
    }
    setMaterial(playerMaterial);
}