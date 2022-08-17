const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const creepsSpawner = require('./creeps.spawner');
const roleBuilder = require('./role.builder');
const roleCarrier = require('./role.carrier');
const tower = require('./tower');
const roleMiner = require('./role.miner');
const link = require('./link');
const roleScout = require('./role.scout');

module.exports.loop = function () {
    let room = 'W57S26';
    let creepsCounter = { harvester: 0, builder: 0, upgrader: 0, carrier: 0, miner: 0, scout: 0 };
    let creepsNeeded = { harvester: 0, builder: 0, upgrader: 2, carrier: 1, miner: 1, scout: 0 };
    let structures = {
        extensions: structureFilter(STRUCTURE_EXTENSION),
        containers: structureFilter(STRUCTURE_CONTAINER),
        storages: structureFilter(STRUCTURE_STORAGE),
        towers: structureFilter(STRUCTURE_TOWER),
        links: structureFilter(STRUCTURE_LINK),
        spawn: Game.spawns.SP,
        constructionSites: Game.rooms[room].find(FIND_CONSTRUCTION_SITES),
        sources: Game.rooms[room].find(FIND_SOURCES),
    }
    function structureFilter(type) { return Game.rooms[room].find(FIND_STRUCTURES, { filter: { structureType: type, } }) }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        creepsCounter[creep.memory.role]++;

        if (creep.memory.role == 'harvester') roleHarvester.run(creep, structures);
        else if (creep.memory.role == 'upgrader') roleUpgrader.run(creep, structures);
        else if (creep.memory.role == 'builder') roleBuilder.run(creep, structures);
        else if (creep.memory.role == 'carrier') roleCarrier.run(creep, structures);
        else if (creep.memory.role == 'miner') roleMiner.run(creep, structures);
        else if (creep.memory.role == 'scout') roleScout.run(creep, structures);
    }

    tower.run(room, structures);
    link.run(room, structures);
    creepsSpawner.run(creepsCounter, creepsNeeded);
};