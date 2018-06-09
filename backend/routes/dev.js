var Router = require("express").Router
var router = Router();
const co = require("co");
const DiseaseManagementService = require("../services/disease")
const PetTypeManagementService = require("../services/pets-type")
const VaccinesManagementService = require("../services/vaccines")
const VaccinationCenterManagementService = require("../services/vaccination-centers")
const InventoryManagementService = require("../services/inventory")

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

router.get("/clear-vaccination-centers-admins", co.wrap(function*(req, res, next){
	res.send({});
	yield VaccinationCenterManagementService.deleteAllAdmins();
}));

router.get("/clear-inventory", co.wrap(function*(req, res, next){
	res.send({});
	yield InventoryManagementService.deleteAll();
}));


module.exports = router;