var roleMiner = {
    run: function (creep, structures) {
        let sources = structures.sources;
        let source = 1;//creep.memory.source;
        let container = structures.containers[0];

        creep.transfer(structures.links[1], RESOURCE_ENERGY);


        if (container.store[RESOURCE_ENERGY] == 2000 &&
            //  structures.links[1].store[RESOURCE_ENERGY] == 800 &&
            container.pos.x == creep.pos.x &&
            container.pos.y == creep.pos.y) {
        }

        else if (creep.harvest(sources[source]) == ERR_NOT_IN_RANGE ||
            container.pos.x != creep.pos.x ||
            container.pos.y != creep.pos.y) {
            creep.moveTo(container);
        }
    }
}
module.exports = roleMiner;