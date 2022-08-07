const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const creepsSpawner = require('./creeps.spawner');
const roleBuilder = require('./role.builder');
const roleCarrier = require('./role.carrier');
const tower = require('./tower');
const roleMiner = require('./role.miner');
const link = require('./link');

module.exports.loop = function () {

    let room = 'E57S52';
    let creepsCounter = { harvester: 0, builder: 0, upgrader: 0, carrier: 0, miner: 0 };
    let creepsNeeded = { harvester: 0, builder: 0, upgrader: 1, carrier: 1, miner: 2 };
    let structures = {

        extension: Game.rooms[room].find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION } }),
        containers: Game.rooms[room].find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_CONTAINER } }),
        storages: Game.rooms[room].find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE } }),
        toRepair: Game.rooms[room].find(FIND_STRUCTURES, { filter: function (object) { return object.hits < object.hitsMax; } }),
        towers: Game.rooms[room].find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } }),
        spawn: Game.spawns.SP,
        constructionSites: Game.rooms[room].find(FIND_CONSTRUCTION_SITES),
        sources: Game.rooms[room].find(FIND_SOURCES),
        links: Game.rooms[room].find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_LINK } }),
        
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role == 'Harvester') {
            roleHarvester.run(creep, structures);
            creepsCounter.harvester++;
        } else if (creep.memory.role == 'Upgrader') {
            roleUpgrader.run(creep, structures);
            creepsCounter.upgrader++;
        } else if (creep.memory.role == 'Builder') {
            roleBuilder.run(creep, structures);
            creepsCounter.builder++;
        } else if (creep.memory.role == 'Carrier') {
            roleCarrier.run(creep, structures);
            creepsCounter.carrier++;
        } else if (creep.memory.role == 'Miner') {
            roleMiner.run(creep, structures);
            creepsCounter.miner++;
        }

    }


    tower.tower(room, structures);
    link(room, structures);
    creepsSpawner.run(creepsCounter, creepsNeeded);
};