module.exports = {
    run: function (room, structures) {
        var hostiles = Game.rooms[room].find(FIND_HOSTILE_CREEPS);

        structures.towers.forEach(tower => {
            if (hostiles != 0) tower.attack(hostiles[0]);
            else tower.repair(structuresToRepair());
        })

        function structuresToRepair() {
            let road = structureFilter('road', 'hitsMax');
            let wall = structureFilter('constructedWall', 300000);
            let rampart = structureFilter('rampart', 100000);
            let container = structureFilter('container', 'hitsMax');

            if (road[0]) return road[0];
            else if (container[0]) return container[0];
            else if (rampart[0]) return rampart[0];
            else if (wall[0]) return wall[0];
        }

        function structureFilter(type, hitsMax) {
            if (hitsMax == 'hitsMax') {
                return Game.rooms[room].find(FIND_STRUCTURES,
                    { filter: function (object) { return object.hits < object.hitsMax && object.structureType == type; } });
            } else {
                return Game.rooms[room].find(FIND_STRUCTURES,
                    { filter: function (object) { return object.hits < hitsMax && object.structureType == type; } });
            }
        }
    }
}