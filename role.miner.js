module.exports = {
    run: function (creep, structures) {
        let sources = structures.sources;
        let source = 1;
        let container = structures.containers[0];

        creep.transfer(structures.links[1], RESOURCE_ENERGY);

        if (container.store[RESOURCE_ENERGY] == 2000
            && container.pos.x == creep.pos.x
            && container.pos.y == creep.pos.y) { }

        else if (creep.harvest(sources[source]) == ERR_NOT_IN_RANGE
            || container.pos.x != creep.pos.x
            || container.pos.y != creep.pos.y) {
            creep.moveTo(container);
        }
    }
}