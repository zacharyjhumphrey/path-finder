export default function styleCorners(cellMap, row, col) {
    if (cellMap[row][col].type === 'Empty-Cell') return { tl: true, tr: true, br: true, bl: true }

    let rowUnderflow = (row - 1 < 0),
        colUnderflow = (col - 1 < 0),
        rowOverflow = row + 1 >= cellMap.length,
        colOverflow = col + 1 >= cellMap[0].length;

    let thisCell = cellMap[row][col],
        tl =  !(rowUnderflow || colUnderflow) ? cellMap[row - 1][col - 1].type === thisCell.type : true,
        t = !(rowUnderflow) ? cellMap[row - 1][col].type === thisCell.type : true,
        tr = !(rowUnderflow || colOverflow) ? cellMap[row - 1][col + 1].type === thisCell.type : true,
        l = !(colUnderflow) ? cellMap[row][col - 1].type === thisCell.type : true,
        r = !(colOverflow) ? cellMap[row][col + 1].type === thisCell.type : true,
        bl = !(rowOverflow || colUnderflow) ? cellMap[row + 1][col - 1].type === thisCell.type : true,
        b = !(rowOverflow) ? cellMap[row + 1][col].type === thisCell.type : true,
        br = !(rowOverflow || colOverflow) ? cellMap[row + 1][col + 1].type === thisCell.type : true;

    return {
        tl: (l || tl || t),
        tr: (t || tr || r),
        bl: (l || bl || b),
        br: (b || br || r),
    }
}