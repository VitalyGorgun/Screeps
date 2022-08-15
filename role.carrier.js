var roleCarrier = {
    run: function (creep, structures) {
        let extension = creep.pos.findClosestByPath(structures.extension,
            { filter: function (object) { return object.energy < object.energyCapacity; } });
        let towers = creep.pos.findClosestByRange(structures.towers,
            { filter: function (object) { return object.energy < object.energyCapacity; } });
        let storage = creep.pos.findClosestByRange(structures.storages);
        let spawn = structures.spawn;
        let container = structures.containers[0];

        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        let source = function () {  //selection of a higher priority source
            // if (structures.links[0].store[RESOURCE_ENERGY] >= 100) return structures.links[0];
            // else 
            if (container.store[RESOURCE_ENERGY] >= 300) return container;
            // else if (storage.store[RESOURCE_ENERGY] >= 300) return storage;
        }

        let targetToTransfer = function () {    //selection of a higher priority target
            if (spawn.energy < spawn.energyCapacity) return spawn;
            else if (!!extension && extension.energy < extension.energyCapacity) return extension;
            else if (!!towers && towers.energy < towers.energyCapacity) return towers;
            // else return storage;
        }

        if (!creep.memory.full &&
            creep.withdraw(source(), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source());
            creep.say(source().structureType);
        }
        else if (creep.memory.full &&
            creep.transfer(targetToTransfer(), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetToTransfer());
            creep.say(targetToTransfer().structureType);
        }
    }
}
module.exports = roleCarrier;