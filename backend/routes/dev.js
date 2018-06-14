var Router = require("express").Router
var router = Router();
const co = require("co");
const DiseaseManagementService = require("../services/disease")
const PetTypeManagementService = require("../services/pets-type")
const VaccinesManagementService = require("../services/vaccines")
const VaccinationCenterManagementService = require("../services/vaccination-centers")
const InventoryManagementService = require("../services/inventory")
const PetManagementService = require("../services/pet")
const VaccinationManagementService = require("../services/vaccinations")
const TokensManagementService = require("../services/token")
const RequestsManagementService = require("../services/request")


router.get("/clear-diseases", httpCoWrap(function*(req, res, next){
	res.send({});
	yield DiseaseManagementService.deleteAll();
}));

router.get("/clear-pet-types", httpCoWrap(function*(req, res, next){
	res.send({});
	yield PetTypeManagementService.deleteAll();
}));

router.get("/clear-pet-breeds", httpCoWrap(function*(req, res, next){
	res.send({});
	yield PetTypeManagementService.deleteAllBreeds();
}));


router.get("/clear-vaccines", httpCoWrap(function*(req, res, next){
	res.send({});
	yield VaccinesManagementService.deleteAll();
}));

router.get("/clear-vaccination-centers", httpCoWrap(function*(req, res, next){
	res.send({});
	yield VaccinationCenterManagementService.deleteAll();
}));

router.get("/clear-vaccination-centers-admins", httpCoWrap(function*(req, res, next){
	res.send({});
	yield VaccinationCenterManagementService.deleteAllAdmins();
}));

router.get("/clear-inventory", httpCoWrap(function*(req, res, next){
	res.send({});
	yield InventoryManagementService.deleteAll();
}));

router.get("/clear-pets", httpCoWrap(function*(req, res, next){
	res.send({});
	yield PetManagementService.deleteAll();
}));

router.get("/clear-vaccinations", httpCoWrap(function*(req, res, next){
	res.send({});
	yield VaccinationManagementService.deleteAll();
}));

router.get("/clear-tokens", httpCoWrap(function*(req, res, next){
	res.send({});
	yield TokensManagementService.deleteAll();
}));

router.get("/clear-requests", httpCoWrap(function*(req, res, next){
	res.send({});
	yield RequestsManagementService.deleteAll();
}));


module.exports = router;