var Router = require("express").Router
var router = Router();
const co = require("co");
const DiseaseManagementService = require("../services/diseases")
const PetTypeManagementService = require("../services/pets-type")
const VaccinesManagementService = require("../services/vaccines")
const VaccinationCenterManagementService = require("../services/vaccination-centers")

router.get("/clear-diseases", co.wrap(function*(req, res, next){
	res.send({});
	yield DiseaseManagementService.deleteAll();
}));

router.get("/clear-pet-types", co.wrap(function*(req, res, next){
	res.send({});
	yield PetTypeManagementService.deleteAll();
}));

router.get("/clear-pet-breeds", co.wrap(function*(req, res, next){
	res.send({});
	yield PetTypeManagementService.deleteAllBreeds();
}));


router.get("/clear-vaccines", co.wrap(function*(req, res, next){
	res.send({});
	yield VaccinesManagementService.deleteAll();
}));

router.get("/clear-vaccination-centers", co.wrap(function*(req, res, next){
	res.send({});
	yield VaccinationCenterManagementService.deleteAll();
}));


module.exports = router;