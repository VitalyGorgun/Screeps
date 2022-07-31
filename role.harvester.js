var roleHarvester = {
    run: function (creep) {

        if (creep.carry.energy < creep.carryCapacity) {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            structures = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function (object) {
                    return object.energy < object.energyCapacity;;
                }
            });

            if (structures[0] && creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structures[0]);

                console.log(structures[0]);

            } else {
                creep.moveTo(Game.spawns.SP)
            }
        }
    }
}
module.exports = roleHarvester;