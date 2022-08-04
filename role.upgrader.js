var roleUpgrader = {
    run: function (creep) {
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;
        let sources = creep.room.find(FIND_SOURCES);

        if (!creep.memory.full) {
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
            // var Container = creep.room.find(FIND_STRUCTURES, {
            //     filter: (s) => s.structureType == STRUCTURE_CONTAINER
            // })
            // if (creep.withdraw(Container[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(Container[1])
            // }
        }

        else {//Модернізувати контролер якщо заповненний
            let controller = creep.room.controller;
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }
    }
}
module.exports = roleUpgrader;