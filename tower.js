module.exports = {
    tower: function (room, structures) {
        for (let tower in structures.towers) {
            if (structures.toRepair[0]) {
//   structures.towers[tower].repair(structures.toRepair[structures.toRepair.length - 1])  
                if (structures.toRepair[structures.toRepair.length - 1].structureType != 'constructedWall') {
                    structures.towers[tower].repair(structures.toRepair[structures.toRepair.length - 1])    
                }
                // structures.towers[tower].repair(structures.toRepair[structures.toRepair.length - 1])

                // console.log(structures.toRepair[structures.toRepair.length - 1])
            }
        }
    }
}