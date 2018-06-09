const mongoose = require("mongoose")
const Pet = mongoose.model('Pet');

module.exports.createPet = function*(petData){
	let existingPet = yield Pet.findOne({name:petData.name});
	if(existingPet){
		return existingPet;
	}
	return yield Pet.create(petData);
};

module.exports.updatePet = function*(id, petData){
	return yield Pet.update({_id:id},petData);
};

module.exports.deletePet = function*(petId){
	return yield Pet.remove({_id:petId});
};

module.exports.pets = function*(query={}, page){
	return yield Pet.paginate(query, page);
};

module.exports.petWithId = function*(petId){
	return yield Pet.findOne({_id:petId}).exec();
};

module.exports.petsOfOwner = function*(ownerId){
	return yield Pet.find({owner:ownerId}).exec();
};

module.exports.petWithName = function*(name){
	return yield Pet.findOne({name:name}).exec();
};

module.exports.deleteAll = function*(){
	return yield Pet.remove({});
};