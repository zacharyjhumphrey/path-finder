/* WALL --------------------------------------------------
    Generic wall preventing the player from getting to the end

    (setMaterial)
        setMaterial (fn):
            Change properties of the parent cell
------------------------------------------------------- */
function createWall(setMaterial) { 
    /* -------------------------- FUNCTIONAL -------------------------- */
    const wallMaterial = {
        type: 'Wall',
        isPassable: false,
    }
    setMaterial(wallMaterial);
}

export default createWall;

/* ---------------------------- NOTES ---------------------------- */
