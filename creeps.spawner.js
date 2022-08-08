var creepsSpawner = {
    run: function (creepsCounter, creepsNeeded) {
        let rnd = Math.round(Math.random() * 10)
        let creepConfig = {
            carrier: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            miner: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, CARRY],
            upgrader: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            builder: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
            harvester: [MOVE],
        }

        function queueToSpawn() {//Choiсe which creep to spawn
            if (creepsCounter.carrier < creepsNeeded.carrier) return 'carrier';
            else if (creepsCounter.miner < creepsNeeded.miner) return 'miner';
            else if (creepsCounter.upgrader < creepsNeeded.upgrader) return 'upgrader';
            else if (creepsCounter.builder < creepsNeeded.builder) return 'builder';
            else if (creepsCounter.harvester < creepsNeeded.harvester) return 'harvester';
        }

        function spawner(creepType) {//Spawn choiced creep
            Game.spawns.SP.createCreep(
                creepConfig[creepType], //Creep configuration
                creepType[0].toUpperCase() + rnd,//Creep name
                { role: creepType, source: Memory.source });//Creep role init
            if (creepType == 'miner') Memory.source == 0 ? Memory.source = 1 : Memory.source = 0;
        }

        if (!!queueToSpawn()) spawner(queueToSpawn());

    }
}
module.exports = creepsSpawner;
// BODYPART_COST: {
//     "move": 50,
//     "work": 100,
//     "attack": 80,
//     "carry": 50,
//     "heal": 250,
//     "ranged_attack": 150,
//     "tough": 10,
//     "claim": 600 }

// Game.spawns.SP.createCreep(
//     [CARRY, CARRY, CARRY, CARRY, 
//         MOVE, MOVE, MOVE, MOVE, ]
//     , 'C ',
//     { role: 'Carrier' }
// );