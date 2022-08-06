var roleUpgrader = {
    run: function (creep, structures) {
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;
        let sources = creep.room.find(FIND_SOURCES);

        if (!creep.memory.full) {
            if (creep.withdraw(structures.storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structures.storages[0])
            }
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