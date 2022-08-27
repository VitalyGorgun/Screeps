module.exports = {
    run: function (creep, structures) {
        let sources = structures.containers
        sources.push(structures.storages[0])
        let source = creep.pos.findClosestByPath(sources)
        let target = creep.pos.findClosestByPath(structures.constructionSites)

        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full
            && structures.storages[0].store[RESOURCE_ENERGY] >= 10000
            && creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source)
        }
        else if (creep.memory.full && target) {
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
}