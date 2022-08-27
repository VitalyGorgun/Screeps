module.exports = {
    run: function (room, structures) {
        let storageCapacity = structures.storages[0].store[RESOURCE_ENERGY];
        if (structures.links[0].store[RESOURCE_ENERGY] == 800
            && storageCapacity >= 50000) {
            structures.links[0].transferEnergy(structures.links[1]);
        }
    }
}