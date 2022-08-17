module.exports = {
    run: function (creep, structures) {
        if (creep.carry.energy == 0) creep.memory.full = false;
        if (creep.carry.energy == creep.carryCapacity) creep.memory.full = true;

        let sources = creep.room.find(FIND_SOURCES);
        let controller = creep.room.controller;
        let link = structures.links[1];
        let targetDroppedEnergy = findDropedEnergy();

        console.log(targetDroppedEnergy)

        if (!creep.memory.full) {
            if (!!targetDroppedEnergy)
                creep.pickup(targetDroppedEnergy);
            else if (sources[0].energy > 0 && creep.harvest(sources[0],RESOURCE_ENERGY,17) != '-6')
                creep.moveTo(sources[0])
            else if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(link);
            // creep.upgradeController(controller)
        }
        else if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE)//Модернізувати контролер якщо заповненний
            creep.moveTo(controller);

        function findDropedEnergy() {
            let targetDroppedEnergy;
            let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES,
                { filter: (r) => r.resourceType == RESOURCE_ENERGY && r.amount >= 50 });
            if (!!droppedEnergy) droppedEnergy.forEach(droppedEnergy => {
                if (droppedEnergy.pos.x == creep.pos.x && droppedEnergy.pos.y == creep.pos.y)
                    targetDroppedEnergy = droppedEnergy;
            });
            return targetDroppedEnergy
        }
    }
}