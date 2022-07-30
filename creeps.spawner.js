var creepsSpawner = {
    run: function (harvestersCount, upgradersCount, buildersCount) {
        let rnd = Math.round(Math.random()*100000);

        if (harvestersCount < 5) {
            let x = Game.spawns.SP.createCreep([WORK, WORK, MOVE, CARRY],'Harvester '+ rnd);

            for (let name in Game.creeps) {
                if(!Game.creeps[name].memory.role){
                    Game.creeps[name].memory.role = 'Harvester';
                }
            }
        }

        if (upgradersCount < 5) {
            let x = Game.spawns.SP.createCreep([WORK, MOVE, MOVE, CARRY],'Upgrader '+ rnd);

            for (let name in Game.creeps) {
                if(!Game.creeps[name].memory.role){
                    Game.creeps[name].memory.role = 'Upgrader';
                }
            }
        }
        
        if (buildersCount < 5) {
            let x = Game.spawns.SP.createCreep([WORK, WORK, MOVE, CARRY],'Builder '+ rnd);

            for (let name in Game.creeps) {
                if(!Game.creeps[name].memory.role){
                    Game.creeps[name].memory.role = 'Builder';
                }
            }
        }
    }
}
module.exports = creepsSpawner;