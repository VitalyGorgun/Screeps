var creepsSpawner = {
    run: function (harvestersCount, upgradersCount, buildersCount) {
        let rnd = Math.round(Math.random() * 100);

        if (harvestersCount < 5) {
            let x = Game.spawns.SP.createCreep([WORK, WORK, CARRY, CARRY, MOVE], 'H ' + rnd);

            for (let name in Game.creeps) {
                if (!Game.creeps[name].memory.role) {
                    Game.creeps[name].memory.role = 'Harvester';
                }
            }
        }

        if (upgradersCount < 3) {
            let x = Game.spawns.SP.createCreep([WORK, WORK, CARRY, CARRY, MOVE], 'U ' + rnd);

            for (let name in Game.creeps) {
                if (!Game.creeps[name].memory.role) {
                    Game.creeps[name].memory.role = 'Upgrader';
                }
            }
        }

        if (buildersCount < 5) {
            let x = Game.spawns.SP.createCreep([WORK, WORK, CARRY, CARRY, MOVE], 'B ' + rnd);

            for (let name in Game.creeps) {
                if (!Game.creeps[name].memory.role) {
                    Game.creeps[name].memory.role = 'Builder';
                }
            }
        }
    }
}
module.exports = creepsSpawner;

//WORK, MOVE, MOVE, CARRY
//BODYPART_COST: { "move": 50, "work": 100, "attack": 80, "carry": 50, "heal": 250, "ranged_attack": 150, "tough": 10, "claim": 600 }