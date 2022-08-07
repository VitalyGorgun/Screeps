var roleCarrier = {
    run: function (creep, structures) {
        let extension = creep.pos.findClosestByRange(structures.extension,
            { filter: function (object) { return object.energy < object.energyCapacity; } });
        let towers = creep.pos.findClosestByRange(structures.towers,
            { filter: function (object) { return object.energy < object.energyCapacity; } });
        let storage = creep.pos.findClosestByRange(structures.storages);
        let spawn = structures.spawn;
        let container = structures.containers[0];
        let droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        let source = function () {
            if (structures.links[0].store[RESOURCE_ENERGY] >= 100) return structures.links[0];
            else if (container.store[RESOURCE_ENERGY] >= 300) return container;
            else if (storage.store[RESOURCE_ENERGY] >= 300) return storage;
        }

        let targetToTransfer = function () {
            if (spawn.energy < spawn.energyCapacity) return spawn;
            else if (!!extension && extension.energy < extension.energyCapacity) return extension;
            else if (!!towers && towers.energy < towers.energyCapacity) return towers;
            else return storage;
        }

        if (droppedEnergy && !creep.memory.full) {
            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy);
                creep.say('drop');
            }
        }
        else if (!creep.memory.full &&
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

















        // console.log(targetToTransfer());


        // if (!creep.memory.full && structures.links[0].store[RESOURCE_ENERGY] >= 100) {
        //     if (creep.withdraw(structures.links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(structures.links[0])
        //     }
        // }

        // else if (!creep.memory.full && container.store[RESOURCE_ENERGY] >= 300) {
        //     if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(container)
        //     }
        // }

        // else if (!creep.memory.full &&
        //     storages.store[RESOURCE_ENERGY] >= 300 &&
        //     creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(storages)

        // else if (creep.memory.full) transfer();

        // function transfer() {
        //     if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && spawn.energy < spawn.energyCapacity) {
        //         creep.moveTo(spawn);
        //         creep.say('spawn');
        //     } else if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && extension.energy < extension.energyCapacity) {
        //         creep.moveTo(extension);
        //         creep.say('extension')
        //     } else if (creep.transfer(towers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && towers.energy < extension.energyCapacity) {
        //         creep.moveTo(towers);
        //         creep.say('tower')
        //     }
        //     else if (creep.transfer(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(storages);
        //         creep.say('storage')
        //     }
        // }