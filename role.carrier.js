// var roleCarrier = {
//     run: function (creep) {
//         if (creep.carry.energy == 0) creep.memory.full = false;
//         if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

//         //
//         // if (creep.memory.working == true) {
//         let sources = creep.room.find(FIND_SOURCES);
//         console.log(sources)
//         let container = creep.room.find(STRUCTURE_CONTAINER);

//         if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//             creep.moveTo(sources[0]);
//         }
//         // }
//     }
// };

// module.exports = roleCarrier;


var roleCarrier = {
    run: function (creep) {
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        if (!creep.memory.full) {

            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER
                    && s.store[RESOURCE_ENERGY] > 0
            })
            if (creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            }

        } else {
            structures = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function (object) {
                    return object.energy < object.energyCapacity;;
                }
            });

            if (structures[0] && creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structures[0]);
            } else {
                creep.moveTo(Game.spawns.SP)
            }
        }
    }
}
module.exports = roleCarrier;