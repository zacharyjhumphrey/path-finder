/* EMPTYCELL --------------------------------------------------
    Generic wall preventing the player from getting to the end

    (setMaterial)
        setMaterial (fn):
            Change properties of the parent cell
------------------------------------------------------- */
function emptyCell(setMaterial) {
    /* -------------------------- FUNCTIONAL -------------------------- */
    const cellMaterial = {
        type: 'Empty-Cell',
        isPassable: true,
    }
    setMaterial(cellMaterial);
}

export default emptyCell;

/* ---------------------------- NOTES ---------------------------- */
