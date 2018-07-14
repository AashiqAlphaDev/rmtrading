var Router = require("express").Router
var router = Router();
const co = require("co");
const PetsManagementService = require("../services/pet")

router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
    if (req.query.q) {
        var name = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
        var chip_id= {$regex: `.*${req.query.q}.*`, '$options': 'i'}

        query = {$or:[{name}, {chip_id}]};
    }
    if (req.query.page && req.query.limit) {
        var page = {};
        page.page = parseInt(req.query.page);
        page.limit = parseInt(req.query.limit);
        let pets = yield PetsManagementService.pets(query, page);
        res.send(pets);
    }
    else {
        let pets = yield PetsManagementService.pets(query);
        res.send(pets);
    }
}));

router.get("/token/:token", httpCoWrap(function* (req, res, next) {
	console.log(req.params.token);
	const pet = yield PetsManagementService.petByToken(req.params.token);
	res.send(pet);
}));

router.get("/:pet_id", httpCoWrap(function* (req, res, next) {
	let pet = yield PetsManagementService.petWithId(req.params.pet_id);
	res.send(pet);
}));

router.get("/of-owner/:user_id", httpCoWrap(function* (req, res, next) {
	let pets = yield PetsManagementService.petsOfOwner(req.params.user_id);
	res.send(pets);
}));

router.post("/", httpCoWrap(function* (req, res, next) {
	let pet = yield PetsManagementService.createPet(req.body);
	res.send(pet);
}));

router.put("/:pet_id", httpCoWrap(function* (req, res, next) {
	let pet = yield PetsManagementService.updatePet(req.params.pet_id, req.body);
	res.send(pet);
}));

router.delete("/:pet_id", httpCoWrap(function* (req, res, next) {
	yield PetsManagementService.deletePet(req.params.pet_id);
	res.send({});
}));


module.exports = router;