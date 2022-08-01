var roleCarrier = {
    run: function (creep) {

        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        let sources = creep.room.find(FIND_SOURCES);
        let container = creep.room.find(FIND_STRUCTURES,
            {
                filter: {
                    structureType: STRUCTURE_CONTAINER
                }
            })

        if (creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container[creep.memory.source]);
        }
    }
};

module.exports = roleCarrier;


// const target = creep.pos.findClosestByRange(FIND_STRUCTURES,
//     {filter: {structureType: STRUCTURE_WALL}});
// if(target) {
//     if(creep.dismantle(target) == ERR_NOT_IN_RANGE) {
//         creep.moveTo(target);
//     }
// }