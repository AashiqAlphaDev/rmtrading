var Router = require("express").Router
var router = Router();
const co = require("co");
const VaccinationCenterManagementService = require("../services/vaccination-centers")
const isAdmin = require("./super-admin/check-admin")

router.get("/", co.wrap(function*(req, res, next){
	var query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let diseases = yield VaccinationCenterManagementService.vaccinationCenters(query);
	res.send(diseases);
}));

router.get("/:vaccination_center_id", co.wrap(function*(req, res, next){
	let disease = yield VaccinationCenterManagementService.vaccinationCenterWithId(req.params.vaccination_center_id);
	res.send(disease);
}));

router.post("/",isAdmin, co.wrap(function*(req, res, next){
	let disease = yield VaccinationCenterManagementService.createVaccinationCenter(req.body);
	res.send(disease);
}));

router.put("/:vaccination_center_id",isAdmin, co.wrap(function*(req, res, next){
	let disease = yield VaccinationCenterManagementService.updateVaccinationCenter(req.params.vaccination_center_id,req.body);
	res.send(disease);
}));

router.delete("/:vaccination_center_id", isAdmin, co.wrap(function*(req, res, next){
	yield VaccinationCenterManagementService.deleteVaccinationCenter(req.params.vaccination_center_id);
	res.send({});
}));


module.exports = router;