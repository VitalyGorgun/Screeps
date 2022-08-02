var roleCarrier = {
    run: function (creep) {
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full) {

            var Container = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
            })
            if (creep.withdraw(Container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container[0])
            }

        } else {
            structures = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: function (object) {
                    return object.energy < object.energyCapacity;;
                }
            });
 
            if (creep.transfer(structures, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structures);
            } else {
                creep.moveTo(Game.spawns.SP)
            }
        }
    }
}
module.exports = roleCarrier;
