module.exports = {
    tower: function (room, structures) {
        for(let tower in structures.towers){
            if (structures.toRepair[0]) {
                structures.towers[tower].repair(structures.toRepair[0])
                console.log('repair ' + structures.toRepair[0].structureType)
            }
        }

    }
}