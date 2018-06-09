var Router = require("express").Router
var router = Router();
const co = require("co");
const PetsManagementService = require("../services/pet")

router.get("/", co.wrap(function*(req, res, next){
	var query = req.query.query?req.query.query:{};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	if(req.query.page && req.query.limit){
		var page = {};
		page.page = parseInt(req.query.page);
		page.limit = parseInt(req.query.limit);
		let pets = yield PetsManagementService.pets(query, page);
		res.send(pets);
	}
	else{
		let pets = yield PetsManagementService.pets(query);
		res.send(pets);
	}
}));

router.get("/:pet_id", co.wrap(function*(req, res, next){
	let pet = yield PetsManagementService.petWithId(req.params.pet_id);
	res.send(pet);
}));

router.post("/", co.wrap(function*(req, res, next){
	let pet = yield PetsManagementService.createPet(req.body);
	res.send(pet);
}));

router.put("/:pet_id", co.wrap(function*(req, res, next){
	let pet = yield PetsManagementService.updatePet(req.params.pet_id,req.body);
	res.send(pet);
}));

router.delete("/:pet_id", co.wrap(function*(req, res, next){
	yield PetsManagementService.deletePet(req.params.pet_id);
	res.send({});
}));


module.exports = router;