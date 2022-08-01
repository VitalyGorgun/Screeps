var creepsSpawner = {
    run: function (creepsCounter, creepsNeeded) {
        let rnd = Math.round(Math.random() * 10)

        if (creepsCounter.harvester < creepsNeeded.harvester) {
            Game.spawns.SP.createCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE], 'H ' + rnd);
        }

        if (creepsCounter.upgrader < creepsNeeded.upgrader &&
            creepsCounter.harvester >= creepsNeeded.harvester) {
            Game.spawns.SP.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'U ' + rnd);
        }

        if (creepsCounter.builder < creepsNeeded.builder &&
            creepsCounter.harvester >= creepsNeeded.harvester) {
            Game.spawns.SP.createCreep([WORK, WORK, WORK, WORK, WORK,WORK, CARRY, CARRY, MOVE, MOVE], 'B ' + rnd);
        }

        if (creepsCounter.carrier < creepsNeeded.carrier &&
            creepsCounter.harvester >= creepsNeeded.harvester) {
            Game.spawns.SP.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], 'C ' + rnd);
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