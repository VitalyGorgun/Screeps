const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const creepsSpawner = require('./creeps.spawner');
const roleBuilder = require('./role.builder');
const roleCarrier = require('./role.carrier');
const tower = require('./tower');
const roleMiner = require('./role.miner');
const link = require('./link');

module.exports.loop = function () {

    let room = 'W57S26';
    let creepsCounter = { harvester: 0, builder: 0, upgrader: 0, carrier: 0, miner: 0 };
    let creepsNeeded = { harvester: 0, builder: 1, upgrader: 2, carrier: 1, miner: 1 };
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

    console.log(structures.extensions)

    function structureFilter(type) {
        return Game.rooms[room].find(FIND_STRUCTURES, { filter: { structureType: type, } })
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep, structures);
            creepsCounter.harvester++;
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, structures);
            creepsCounter.upgrader++;
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep, structures);
            creepsCounter.builder++;
        } else if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep, structures);
            creepsCounter.carrier++;
        } else if (creep.memory.role == 'miner') {
            roleMiner.run(creep, structures);
            creepsCounter.miner++;
        }
    }

    tower.tower(room, structures);
    // link(room, structures);
    creepsSpawner.run(creepsCounter, creepsNeeded);
};