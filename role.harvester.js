var roleHarvester = {
    run: function (creep, structures) {
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        let sources = creep.room.find(FIND_SOURCES);

        if (!creep.memory.full) {
            creep.say('hrv');
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {

            let extension = creep.pos.findClosestByRange(structures.extension, { filter: function (object) { return object.energy < object.energyCapacity; } });
            let towers = creep.pos.findClosestByRange(structures.towers, { filter: function (object) { return object.energy < object.energyCapacity; } });
            let storages = creep.pos.findClosestByRange(structures.storages);
            let spawn = structures.spawn;

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
};

module.exports = roleHarvester;