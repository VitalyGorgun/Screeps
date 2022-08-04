var roleMiner = {
    run: function (creep, structures) {
        let sources = structures.sources;
        let source = creep.memory.source;
        let container = structures.containers[source];


        if (creep.harvest(sources[source]) == ERR_NOT_IN_RANGE ||
            container.pos.x != creep.pos.x ||
            container.pos.y != creep.pos.y) {
            creep.moveTo(container);
            console.log("Miner is moving");
        }
    }
}
module.exports = roleMiner;