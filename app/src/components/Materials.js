export const MATERIALS = {
    'Wall': {
        type: 'Wall',
        isPassable: false,
        isPath: false,
        borderEdges: {
            tl: false,
            tr: false,
            br: false,
            bl: false,
        }
    },
    'Player': {
        type: 'Player-Cell',
        isPassable: true,
        isPath: false,
        borderEdges: {
            tl: false,
            tr: false,
            br: false,
            bl: false,
        }
    },
    'Goal': {
        type: 'Goal-Cell',
        isPassable: true,
        isPath: false,
        borderEdges: {
            tl: false,
            tr: false,
            br: false,
            bl: false,
        }
    },
    'Empty-Cell': {
        type: 'Empty-Cell',
        isPassable: true,
        isPath: false,
        borderEdges: {
            tl: true,
            tr: true,
            br: true,
            bl: true,
        }
    },
    'Path-Cell': {
        type: 'Empty-Cell',
        isPassable: true,
        isPath: true,
        borderEdges: {
            tl: true,
            tr: true,
            br: true,
            bl: true,
        }
    },
}
