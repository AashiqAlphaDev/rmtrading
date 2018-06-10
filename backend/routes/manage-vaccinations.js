var Router = require("express").Router
var router = Router();
const co = require("co");
const VaccinationManagementService = require("../services/vaccinations")

router.get("/", co.wrap(function*(req, res, next){
	var query = req.query.query?req.query.query:{};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let diseases = yield VaccinationManagementService.vaccinations(req.params.pet_id,query);
	res.send(diseases);
}));

router.get("/:vaccination_id", co.wrap(function*(req, res, next){
	let disease = yield VaccinationManagementService.vaccinationWithId(req.params.vaccination_id);
	res.send(disease);
}));

router.post("/", co.wrap(function*(req, res, next){
	let disease = yield VaccinationManagementService.createVaccination(req.body);
	res.send(disease);
}));

router.put("/:vaccination_id",co.wrap(function*(req, res, next){
	let disease = yield VaccinationManagementService.updateVaccination(req.params.pet_id,req.params.vaccination_id,req.body);
	res.send(disease);
}));


module.exports = router;