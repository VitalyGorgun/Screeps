var roleUpgrader = {
    run: function (creep) {

        switch (creep.carry.energy) {//перевірка на заповненість кріпа
            case 0:
                creep.memory.full = false;
                break
            case creep.carryCapacity:
                creep.memory.full = true;
                break
        }

        if (!creep.memory.full) {//Добувати якщо пустий
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }

        else {//Модернізувати контролер якщо заповненний
            let controller = creep.room.controller;
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }
    }
}
module.exports = roleUpgrader;