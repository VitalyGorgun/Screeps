module.exports = {
    run: function (creep, structures) {
        let sources = structures.containers
        sources.push(structures.storages[0])

        let source = creep.pos.findClosestByPath(sources, {
            filter: function (object) {
                return object.store[RESOURCE_ENERGY] >= 200
            }
        })

        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
        else if (creep.memory.full) {
            let target = creep.pos.findClosestByRange(structures.constructionSites);

            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}