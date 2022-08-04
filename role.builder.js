var roleBuilder = {
    run: function (creep, structures) {
        let storages = creep.pos.findClosestByRange(structures.storages);

        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full) {
            if (creep.withdraw(storages, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storages)
            }
        }

        else {
            let target = creep.pos.findClosestByRange(structures.constructionSites);
            let toRepair = false;//creep.pos.findClosestByRange(structures.toRepair);

            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}
module.exports = roleBuilder;