var Router = require("express").Router;
var router = Router();
const co = require("co");
const PetTypeManagementService = require("../../services/pets-type");

router.get("/", co.wrap(function*(req, res, next){
	var query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let diseases = yield PetTypeManagementService.petTypes(query);
	res.send(diseases);
}));

router.get("/:pet_type_id", co.wrap(function*(req, res, next){
	let disease = yield PetTypeManagementService.petTypeWithId(req.params.pet_type_id);
	res.send(disease);
}));

router.post("/", co.wrap(function*(req, res, next){
	let disease = yield PetTypeManagementService.createPetType(req.body);
	res.send(disease);
}));

router.put("/:pet_type_id", co.wrap(function*(req, res, next){
	let disease = yield PetTypeManagementService.updatePetType(req.params.pet_type_id,req.body);
	res.send(disease);
}));

router.delete("/:pet_type_id", co.wrap(function*(req, res, next){
	yield PetTypeManagementService.deletePetType(req.params.pet_type_id);
	res.send({});
}));

router.get("/:pet_type_id/breed", co.wrap(function*(req, res, next){
	let query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let diseases = yield PetTypeManagementService.petBreeds(req.params.pet_type_id,query);
	res.send(diseases);
}));

router.get("/:pet_type_id/breed/:breed_id", co.wrap(function*(req, res, next){
	let disease = yield PetTypeManagementService.petBreedWithId(req.params.pet_type_id);
	res.send(disease);
}));

router.post("/:pet_type_id/breed", co.wrap(function*(req, res, next){
	let disease = yield PetTypeManagementService.createPetBreed(req.params.pet_type_id,req.body);
	res.send(disease);
}));

router.put("/:pet_type_id/breed/:breed_id", co.wrap(function*(req, res, next){
	let disease = yield PetTypeManagementService.updatePetBreed(req.params.breed_id,req.body);
	res.send(disease);
}));

router.delete("/:pet_type_id/breed/:breed_id", co.wrap(function*(req, res, next){
	yield PetTypeManagementService.deletePetBreed(req.params.breed_id,req.params.pet_type_id);
	res.send({});
}));



module.exports = router;