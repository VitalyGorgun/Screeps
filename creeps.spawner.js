var creepsSpawner = {
    run: function (creepsCounter, creepsNeeded) {
        let rnd = Math.round(Math.random() * 10)

        if (creepsCounter.harvester < creepsNeeded.harvester) {
            Game.spawns.SP.createCreep(
                [WORK,
                    CARRY, CARRY,
                    MOVE, MOVE],
                'H ' + rnd, { role: 'Harvester' })
        }
        else if (creepsCounter.miner < creepsNeeded.miner) {
            if (Game.spawns.SP.createCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, CARRY],
                'M ' + rnd, { role: 'Miner', source: Memory.source}) == 'M ' + rnd) {
                Memory.source == 0 ? Memory.source = 1 : Memory.source = 0;
            }
        }
        else if (creepsCounter.carrier < creepsNeeded.carrier) {
            Game.spawns.SP.createCreep(
                [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,]
                , 'C ' + rnd,
                { role: 'Carrier' }
            );
        }
        else if (creepsCounter.upgrader < creepsNeeded.upgrader) {
            Game.spawns.SP.createCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'U' + rnd,
                { role: 'Upgrader' });
        }
        else if (creepsCounter.builder < creepsNeeded.builder) {
            Game.spawns.SP.createCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'B ' + rnd,
                { role: 'Builder' });
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


// Game.spawns.SP.createCreep(
//     [CARRY, CARRY, 
//         MOVE, MOVE, ]
//     , 'C ',
//     { role: 'Carrier' }
// );