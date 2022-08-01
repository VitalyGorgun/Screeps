const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const creepsSpawner = require('./creeps.spawner');
const roleBuilder = require('./role.builder');
const roleCarrier = require('./role.carrier');


module.exports.loop = function () {

    let creepsCounter = { harvester: 0, builder: 0, upgrader: 0, carrier: 0 };
    let creepsNeeded = { harvester: 2, builder: 1, upgrader: 5, carrier: 1 };

    for (let name in Game.creeps) {

        let creep = Game.creeps[name];

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

        if (creep.memory.role == 'Carrier') {
            roleCarrier.run(creep);
            creepsCounter.carrier++;
        }
    }

    creepsSpawner.run(creepsCounter, creepsNeeded);
    console.log("H: " + creepsCounter.harvester + " | U: " + creepsCounter.upgrader + " | B: " + creepsCounter.builder + " | C: " + creepsCounter.carrier);
};