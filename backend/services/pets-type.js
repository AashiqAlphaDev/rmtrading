const mongoose = require("mongoose")
const PetType = mongoose.model('PetType');
const PetBreed = mongoose.model('Breed');

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

module.exports.createPetBreed = function*(petTypeId,petBreedData){
	petBreedData.pet_type = petTypeId;
	return yield PetBreed.create(petBreedData);
};

module.exports.updatePetBreed = function*(id, petBreedData){
	return yield PetBreed.update({_id:id},petBreedData);
};

module.exports.deletePetBreed = function*(petBreedId){
	return yield PetBreed.remove({_id:petBreedId});
};

module.exports.petBreeds = function*(petTypeId,query={}){
	query.pet_type = petTypeId;
	return yield PetBreed.find(query).exec();
};

module.exports.petBreedWithId = function*(petBreedId){
	return yield PetBreed.findOne({_id:petBreedId}).exec();
};

module.exports.petBreedWithName = function*(petTypeId,name){
	return yield PetBreed.findOne({name:name}).exec();
};