var roleCarrier = {
    run: function (creep, structures) {
        let extension = creep.pos.findClosestByRange(structures.extension, { filter: function (object) { return object.energy < object.energyCapacity; } });
        let towers = creep.pos.findClosestByRange(structures.towers, { filter: function (object) { return object.energy < object.energyCapacity; } });
        let storages = creep.pos.findClosestByRange(structures.storages);
        let spawn = structures.spawn;
        let container = structures.containers[0];
        // console.log(storages.store[RESOURCE_ENERGY])
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full && container.store[RESOURCE_ENERGY] >= 300) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container)
            }
        } else if (!creep.memory.full) {
            if (creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storages)
            }
        } else {
            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && spawn.energy < spawn.energyCapacity) {
                creep.moveTo(spawn);
                creep.say('spn');
            } else if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extension);
                creep.say('ext');
            } else if (creep.transfer(towers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(towers);
                creep.say('twr');
            } else if (creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storages);
                creep.say('stg');
            }
        }
    }
}
module.exports = roleCarrier;
