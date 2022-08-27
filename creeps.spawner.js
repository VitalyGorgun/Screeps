module.exports = {
    run: function (structures) {
        let creeps = {
            miner: {
                need: 2,
                exist: findCreepCountByRole('miner'),
                configuration: configurateCreep(8, 2, 1)
            },
            carrier: {
                need: 1,
                exist: findCreepCountByRole('carrier'),
                configuration: configurateCreep(0, 10, 20)
            },
            builder: {
                need: 0,
                exist: findCreepCountByRole('builder'),
                configuration: configurateCreep(4, 6, 20)
            },
            upgrader: {
                need: 1,
                exist: findCreepCountByRole('upgrader'),
                configuration: configurateCreep(17, 1, 1)
            },
            harvester: {
                need: 0,
                exist: findCreepCountByRole('harvester'),
                configuration: configurateCreep(0, 0, 0)
            },
            scout: {
                need: 0,
                exist: findCreepCountByRole('scout'),
                configuration: configurateCreep(0, 1, 0)
            },
        }

        function findCreepCountByRole(role) {
            let creeps = _(Game.creeps).filter({ memory: { role: role } }).value()
            return Object.keys(creeps).length
        }

        function configurateCreep(work, move, carry) {
            let result = [];
            for (let x = 0; x < work; x++) result.push('work')
            for (let x = 0; x < move; x++) result.push('move')
            for (let x = 0; x < carry; x++) result.push('carry')
            return result
        }

        let carrierToLive = () => {
            let creeps = _(Game.creeps).filter({ memory: { role: 'carrier' } }).value();
            for (let x in creeps) {
                return creeps[x].ticksToLive < 100 ? true : false;
            }
        }

        function choiceCreepToSpawn() {   //Choiсe which creep to spawn
            if (creeps.carrier.exist < creeps.carrier.need) return 'carrier';
            else if (!carrierToLive() && creeps.miner.exist < creeps.miner.need) return 'miner';
            else if (!carrierToLive() && creeps.upgrader.exist < creeps.upgrader.need) return 'upgrader';
            else if (!carrierToLive() && creeps.builder.exist < creeps.builder.need) return 'builder';
            else if (!carrierToLive() && creeps.scout.exist < creeps.scout.need) return 'scout';
        }

        function spawner(creepType) {   //Spawn choiced creep
            let rnd = Math.round(Math.random() * 10)

            if (creepType == 'miner') {
                Game.spawns.SP.createCreep(
                    creeps[creepType].configuration, //Creep configuration
                    creepType[0].toUpperCase() + rnd,   //Creep name
                    { role: creepType, source: choiceSource() });
            } else {
                Game.spawns.SP.createCreep(
                    creeps[creepType].configuration, //Creep configuration
                    creepType[0].toUpperCase() + rnd,   //Creep name
                    { role: creepType });    //Creep role init
            }
        }

        function choiceSource() {
            if (!_(Game.creeps).filter({ memory: { role: 'miner', source: structures.sources[1].id } }).value()[0]) {
                return structures.sources[1].id
            }
            else if (!_(Game.creeps).filter({ memory: { role: 'miner', source: structures.minerals[0].id } }).value()[0]) {
                return structures.minerals[0].id;
            }

        }
        // console.log(choiceSource())



        if (!!choiceCreepToSpawn()) spawner(choiceCreepToSpawn());  //if queue is not empty spawn needed creep
    }
}