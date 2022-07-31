const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const creepsSpawner = require('./creeps.spawner');
const roleBuilder = require('./role.builder');


module.exports.loop = function () {

    let creepsCounter = { harvester: 0, builder: 0, upgrader: 0 };
    let creepsNeeded = { harvester: 3, builder: 4, upgrader: 3 };

    for (let name in Game.creeps) {

        let creep = Game.creeps[name];

        switch (name[0]) {
            case 'B':
                creep.memory.role = 'Builder';
                break
            case 'U':
                creep.memory.role = 'Upgrader';
                break
            case 'H':
                creep.memory.role = 'Harvester';
                break
            default:
                creep.memory.role = 'Harvester';
        }

        if (creep.memory.role == 'Harvester') {
            roleHarvester.run(creep);
            creepsCounter.harvester++;
        }
        if (creep.memory.role == 'Upgrader') {
            roleUpgrader.run(creep);
            creepsCounter.upgrader++;
        }
        if (creep.memory.role == 'Builder') {
            roleBuilder.run(creep);
            creepsCounter.builder++;
        }
    }

    creepsSpawner.run(creepsCounter, creepsNeeded);
    console.log("Harvesters: " + creepsCounter.harvester + " | Upgraders: " + creepsCounter.upgrader + " | Builders: " + creepsCounter.builder);
};