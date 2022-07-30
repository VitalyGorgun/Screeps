var roleHarvester = {
    run: function (creep) {
            
            if (creep.carry.energy < creep.carryCapacity) {
                let sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            } else {
                if (creep.transfer(Game.spawns.SP, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns.SP);
                }
            }
    }
}
module.exports = roleHarvester;