module.exports = {
    run: function (creep, structures) {
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        let sources = creep.room.find(FIND_SOURCES);
        let extension = creep.pos.findClosestByPath(structures.extensions, { filter: function (object) { return object.energy < object.energyCapacity; } });
        let tower = creep.pos.findClosestByPath(structures.towers, { filter: function (object) { return object.energy < object.energyCapacity; } });
        let storage = creep.pos.findClosestByPath(structures.storages);
        let spawn = structures.spawn;


        if (!creep.memory.full) {
            creep.say('hrv');
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        } else {
            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && spawn.energy < spawn.energyCapacity) {
                creep.moveTo(spawn);
                creep.say('spn');
            } else if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(extension);
                creep.say('ext');
            }
        }
    }
};