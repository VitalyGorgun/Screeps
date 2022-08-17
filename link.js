module.exports = {
    run: function (room, structures) {
        if (structures.links[0].store[RESOURCE_ENERGY] == 800) {
            structures.links[0].transferEnergy(structures.links[1]);
        }
    }
}