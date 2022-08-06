var roleMiner = {
    run: function (creep, structures) {
        let sources = structures.sources;
        let source = creep.memory.source;
        let container = structures.containers[source];

        creep.transfer(structures.links[1], RESOURCE_ENERGY);

        if (container.store[RESOURCE_ENERGY] == 2000) {
            // console.log('storage ' + creep.memory.source + ' is full')
        }

        else if (creep.harvest(sources[source]) == ERR_NOT_IN_RANGE ||
            container.pos.x != creep.pos.x ||
            container.pos.y != creep.pos.y) {
            creep.moveTo(container);
        }
    }
}
module.exports = roleMiner;