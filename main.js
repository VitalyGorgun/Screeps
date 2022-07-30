const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const creepsSpawner = require('./creeps.spawner');
const roleBuilder = require('./role.builder');


module.exports.loop = function () {

    let creepsCount = 0;
    let harvestersCount = 0;
    let upgradersCount = 0;
    let buildersCount = 0;

    for (let name in Game.creeps) {

        let creep = Game.creeps[name];

        if (creep.memory.role == 'Harvester') {
            roleHarvester.run(creep);
            harvestersCount++;
        }
        if (creep.memory.role == 'Upgrader') {
            roleUpgrader.run(creep);
            upgradersCount++;
        }
        if (creep.memory.role == 'Builder') {
            roleBuilder.run(creep);
            buildersCount++;
        }

        creepsCount++;
    }



    creepsSpawner.run(harvestersCount, upgradersCount, buildersCount);
    console.log("Harvesters: " + harvestersCount + " | Upgraders: " + upgradersCount+ " | Builders: " + buildersCount);
};

// spawn.createCreep([WORK, MOVE, MOVE, CARRY]);
// creep.moveTo(Game.spawns['SP']); рух на спавн
// Game.spawns.SP.createCreep([WORK, MOVE, MOVE, CARRY]);
// console.log(  Math.round(Math.random()*100000)  );