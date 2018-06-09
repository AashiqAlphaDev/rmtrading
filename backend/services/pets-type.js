const mongoose = require("mongoose")
const PetType = mongoose.model('PetType');


module.exports.createPetType = function*(petTypeData){
	return yield PetType.create(petTypeData);
};

module.exports.updatePetType = function*(id, petTypeData){
	return yield PetType.update({_id:id},petTypeData);
};

module.exports.deletePetType = function*(petTypeId){
	return yield PetType.remove({_id:petTypeId});
};

module.exports.petTypes = function*(query={}){
	return yield PetType.find(query).exec();
};

module.exports.petTypeWithId = function*(petTypeId){
	return yield PetType.findOne({_id:petTypeId}).exec();
};

module.exports.petTypeWithName = function*(name){
	return yield PetType.findOne({name:name}).exec();
};