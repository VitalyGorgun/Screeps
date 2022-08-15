var creepsSpawner = {
    run: function (creepsCounter, creepsNeeded) {
        let rnd = Math.round(Math.random() * 10)
        let creepConfig = {
            carrier: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,],
            miner: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, CARRY],
            upgrader: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
            builder: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE,],
            harvester: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        }
        let carrierToLive = () => {
            let creeps = _(Game.creeps).filter({ memory: { role: 'carrier' } }).value();
            for (let x in creeps) {
                return creeps[x].ticksToLive < 100 ? true : false;
            }
        }
        // console.log(!carrierToLive());


        function queueToSpawn() {   //Choiсe which creep to spawn
            if (creepsCounter.harvester < creepsNeeded.harvester) return 'harvester';
            else if (creepsCounter.carrier < creepsNeeded.carrier) return 'carrier';
            else if (!carrierToLive() && creepsCounter.miner < creepsNeeded.miner) return 'miner';
            else if (!carrierToLive() && creepsCounter.upgrader < creepsNeeded.upgrader) return 'upgrader';
            else if (!carrierToLive() && creepsCounter.builder < creepsNeeded.builder) return 'builder';
        }

        function spawner(creepType) {   //Spawn choiced creep
            Game.spawns.SP.createCreep(
                creepConfig[creepType], //Creep configuration
                creepType[0].toUpperCase() + rnd,//Creep name
                { role: creepType, source: Memory.source });    //Creep role init
            if (creepType == 'miner') Memory.source == 0 ? Memory.source = 1 : Memory.source = 0;
        }

        if (!!queueToSpawn()) spawner(queueToSpawn());  //if queue is not empty spawn needed creep
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

// Game.spawns.SP.createCreep([CARRY, CARRY, MOVE, MOVE], 'C ', { role: 'carrier' });