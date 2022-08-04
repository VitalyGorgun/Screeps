module.exports = {
    tower: function (room, structures) {

        var towers = structures.towers[0];
        var closestDamagedStructure = Game.rooms[room].find(FIND_STRUCTURES,
            {
                filter: function (object) { return object.hits < object.hitsMax; }
            });
        
        if (structures.toRepair[0]) {
            towers.repair(structures.toRepair[0])
            console.log('repair ' + structures.toRepair[0].structureType)
        }

    }
}