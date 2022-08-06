var roleBuilder = {
    run: function (creep, structures) {
        let storage = structures.storages[0];
        let containers = structures.containers;
        containers.push(storage);
        let source = creep.pos.findClosestByRange(containers, {
            filter: function (object) {
                return object.store[RESOURCE_ENERGY] >= 300
            }
        })
        // console.log(source);

        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }

        else {
            let target = creep.pos.findClosestByRange(structures.constructionSites);

            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}
module.exports = roleBuilder;