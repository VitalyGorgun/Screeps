module.exports =  function (room, structures) {
    if(structures.links[1].store[RESOURCE_ENERGY] == 800){
        structures.links[1].transferEnergy(structures.links[0]);
    }
    structures.links[0].transferEnergy(structures.storages[0]);
}
