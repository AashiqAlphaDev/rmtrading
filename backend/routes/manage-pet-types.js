var Router = require("express").Router;
var router = Router();
const co = require("co");
const PetTypeManagementService = require("../services/pets-type");
const isAdmin = require("./super-admin/check-admin");

router.get("/", co.wrap(function*(req, res, next){
	var query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let petTypes = yield PetTypeManagementService.petTypes(query);
	res.send(petTypes);
}));

router.get("/:pet_type_id", co.wrap(function*(req, res, next){
	let petType = yield PetTypeManagementService.petTypeWithId(req.params.pet_type_id);
	res.send(petType);
}));

router.post("/", isAdmin,co.wrap(function*(req, res, next){
	let petType = yield PetTypeManagementService.createPetType(req.body);
	res.send(petType);
}));

router.put("/:pet_type_id",isAdmin, co.wrap(function*(req, res, next){
	let petType = yield PetTypeManagementService.updatePetType(req.params.pet_type_id,req.body);
	res.send(petType);
}));

router.delete("/:pet_type_id", isAdmin,co.wrap(function*(req, res, next){
	yield PetTypeManagementService.deletePetType(req.params.pet_type_id);
	res.send({});
}));

router.get("/:pet_type_id/breeds", co.wrap(function*(req, res, next){
	let query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let petTypes = yield PetTypeManagementService.petBreeds(req.params.pet_type_id,query);
	res.send(petTypes);
}));

router.get("/:pet_type_id/breeds/:breed_id", co.wrap(function*(req, res, next){
	let petBreed = yield PetTypeManagementService.petBreedWithId(req.params.breed_id);
	res.send(petBreed);
}));

router.post("/:pet_type_id/breeds", isAdmin,co.wrap(function*(req, res, next){
	let petType = yield PetTypeManagementService.createPetBreed(req.params.pet_type_id,req.body);
	res.send(petType);
}));

router.put("/:pet_type_id/breeds/:breed_id", isAdmin,co.wrap(function*(req, res, next){
	let petType = yield PetTypeManagementService.updatePetBreed(req.params.breed_id,req.body);
	res.send(petType);
}));

router.delete("/:pet_type_id/breeds/:breed_id", isAdmin,co.wrap(function*(req, res, next){
	yield PetTypeManagementService.deletePetBreed(req.params.breed_id,req.params.pet_type_id);
	res.send({});
}));



module.exports = router;