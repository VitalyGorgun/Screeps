module.exports = {
    run: function (creep, structures) {
        let extension = creep.pos.findClosestByPath(structures.extensions,
            { filter: function (object) { return object.energy < object.energyCapacity; } });
        let towers = creep.pos.findClosestByPath(structures.towers,
            { filter: function (object) { return object.energy < object.energyCapacity; } });
        let storage = creep.pos.findClosestByPath(structures.storages);
        let spawn = structures.spawn;
        let container = structures.containers[0];
        let link = structures.links[0]

        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full
            && creep.withdraw(source(), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source());
            creep.say(source().structureType);
        }
        else if (creep.memory.full
            && creep.transfer(targetToTransfer(), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetToTransfer());
            creep.say(targetToTransfer().structureType);
        }

        function source() {  //selection of a higher priority source
            if (container && container.store[RESOURCE_ENERGY] >= 100) return container;
            else if (storage && storage.store[RESOURCE_ENERGY] >= 300) return storage;
        }

        function targetToTransfer() {    //selection of a higher priority target
            if (spawn.energy < spawn.energyCapacity) return spawn;
            else if (!!extension && extension.energy < extension.energyCapacity) return extension;
            else if (!!towers && towers.energy < towers.energyCapacity) return towers;
            else if (!!link && link.energy < link.energyCapacity) return link;
            else if (storage) return storage;
        }
    }
}