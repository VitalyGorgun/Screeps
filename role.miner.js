module.exports = {
    run: function (creep, structures) {
        let source = Game.getObjectById(creep.memory.source)

        if (source.energyCapacity) mineEnergy();
        if (source.mineralType) mineMineral();

        creep.memory.test = source

        function mineEnergy() {
            let container = structures.containers[0];

            creep.transfer(structures.links[1], RESOURCE_ENERGY);

            if (container.store[RESOURCE_ENERGY] >= 1950
                && container.pos.x == creep.pos.x
                && container.pos.y == creep.pos.y) {
                creep.moveTo(container)
                creep.transfer(container, RESOURCE_ENERGY)
            }

            else if (creep.harvest(source) == ERR_NOT_IN_RANGE
                || container.pos.x != creep.pos.x
                || container.pos.y != creep.pos.y) {
                creep.moveTo(container);
            }
        }

        function mineMineral() {
            let container = structures.containers[1]
            if (creep.store[RESOURCE_HYDROGEN] == 0) creep.memory.full = false;
            if (creep.store[RESOURCE_HYDROGEN] == creep.store.getCapacity()) creep.memory.full = true;




            if (container.store[RESOURCE_HYDROGEN] >= 1950) {
                creep.moveTo(container);
                creep.transfer(container, RESOURCE_HYDROGEN);
            }
            else if (creep.harvest(source) == ERR_NOT_IN_RANGE
                || creep.pos.y != container.pos.y
                || creep.pos.x != container.pos.x) {
                creep.moveTo(container);
            }
        }
    }
}