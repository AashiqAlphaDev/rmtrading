const mongoose = require("mongoose")
const PetType = mongoose.model('PetType');
const PetBreed = mongoose.model('Breed');

module.exports.findElseCreatePetTypeId = function* (petTypeData) {
    let existingPetType = yield PetType.findOne({name: petTypeData.name})
	if(existingPetType){
        return existingPetType._id;
	}
    let newPetType = yield PetType.create(petTypeData);
	return newPetType._id;
}

module.exports.findElseCreateBreedId = function* (breedData) {
    let existingBreed = yield PetBreed.findOne({name: breedData.name})
    if(existingBreed){
        return existingBreed._id;
    }
    let newBreedData = yield PetBreed.create(breedData);
    return newBreedData._id;
}

module.exports.createPetType = function* (petTypeData) {
	validate(petTypeData, ["name"], "You missed <%=param%>.");

	let existingPetType = yield PetType.findOne({name: petTypeData.name})
	if (existingPetType) {
		return existingPetType;
	}
	return yield PetType.create(petTypeData);
};

module.exports.updatePetType = function* (id, petTypeData) {
	queryValidate(id, "You missed pet-type-id.");
	let newVar = yield PetType.update({_id: id}, petTypeData);
	console.log({_id: id}, petTypeData)
	return newVar;
};

module.exports.deletePetType = function* (petTypeId) {
	queryValidate(petTypeId, "You missed pet-type-id.");
	return yield PetType.remove({_id: petTypeId});
};

module.exports.petTypes = function* (query = {}) {
	return yield PetType.find(query).exec();
};

module.exports.petTypeWithId = function* (petTypeId) {
	queryValidate(petTypeId, "You missed pet-type-id.");

	return yield PetType.findOne({_id: petTypeId}).exec();
};

module.exports.petTypeWithName = function* (name) {
	queryValidate(name, "You missed pet-type-name.");
	return yield PetType.findOne({name: name}).exec();
};

module.exports.createPetBreed = function* (petTypeId, petBreedData) {
	console.log("inside create breed" ,petTypeId,petBreedData);
	let existingBreed = yield PetBreed.findOne({pet_type: petTypeId, name: petBreedData.name});
	if (existingBreed) {
		return existingBreed;
	}
	petBreedData.pet_type = petTypeId;
	validate(petBreedData, ["pet_type", "name"], "You missed <%=param%>.");
	return yield PetBreed.create(petBreedData);
};

module.exports.updatePetBreed = function* (id, petBreedData) {
	queryValidate(id, "You missed pet-breed-id.");
	return yield PetBreed.update({_id: id}, petBreedData);
};



module.exports.deletePetBreed = function* (petBreedId) {
	queryValidate(petBreedId, "You missed pet-breed-id.");
	return yield PetBreed.remove({_id: petBreedId});
};

module.exports.petBreeds = function* (petTypeId, query = {}) {
	query.pet_type = petTypeId;
	console.log(query)
	return yield PetBreed.find(query).exec();
};

module.exports.petBreedWithId = function* (petBreedId) {
	queryValidate(petBreedId, "You missed pet-breed-id.");
	return yield PetBreed.findOne({_id: petBreedId}).exec();
};

module.exports.petBreedWithName = function* (petTypeId, name) {
	queryValidate(name, "You missed pet-breed-name.");
	return yield PetBreed.findOne({name: name}).exec();
};


module.exports.deleteAll = function* () {
	return yield PetType.remove({});
};

module.exports.deleteAllBreeds = function* () {
	return yield PetBreed.remove({});
};









