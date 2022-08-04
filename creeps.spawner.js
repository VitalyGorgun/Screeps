var creepsSpawner = {
    run: function (creepsCounter, creepsNeeded) {
        let rnd = Math.round(Math.random() * 10)

        // console.log(Memory.source);

        if (creepsCounter.harvester < creepsNeeded.harvester) {
            Game.spawns.SP.createCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'H ' + rnd, { role: 'Harvester' })
        }

        if (creepsCounter.miner < creepsNeeded.miner &&
            creepsCounter.harvester >= creepsNeeded.harvester) {
            if (Game.spawns.SP.createCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE],
                'M ' + rnd, { role: 'Miner', source: Memory.source, test: 'test' }) == 'M ' + rnd) {
                Memory.source == 0 ? Memory.source = 1 : Memory.source = 0;
            }
        }


        if (creepsCounter.upgrader < creepsNeeded.upgrader &&
            creepsCounter.harvester >= creepsNeeded.harvester) {
            Game.spawns.SP.createCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'U' + rnd,
                { role: 'Upgrader' });
        }

        if (creepsCounter.builder < creepsNeeded.builder &&
            creepsCounter.harvester >= creepsNeeded.harvester) {
            Game.spawns.SP.createCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'B ' + rnd,
                { role: 'Builder' });
        }

        if (creepsCounter.carrier < creepsNeeded.carrier &&
            creepsCounter.harvester >= creepsNeeded.harvester) {
            Game.spawns.SP.createCreep(
                [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,]
                , 'C ' + rnd,
                { role: 'Carrier' }
                // [CARRY, MOVE,]
                // , 'C ' + rnd,
                // { role: 'Carrier' }
            );
        }
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