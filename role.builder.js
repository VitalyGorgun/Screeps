var roleBuilder = {
    run: function (creep) {
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full) {
            var Container = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
            })
            if (creep.withdraw(Container[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container[1])
            }
        }

        else {
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }

        }

    }
}
module.exports = roleBuilder;