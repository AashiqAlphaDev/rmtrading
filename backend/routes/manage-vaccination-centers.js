var Router = require("express").Router;
var router = Router();
const co = require("co");
const VaccinationCenterManagementService = require("../services/vaccination-centers");
const isAdmin = require("./super-admin/check-admin");

router.get("/", co.wrap(function*(req, res, next){
	var query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let vaccinationCenters = yield VaccinationCenterManagementService.vaccinationCenters(query);
	res.send(vaccinationCenters);
}));

router.get("/:vaccination_center_id", co.wrap(function*(req, res, next){
	let vaccinationCenter = yield VaccinationCenterManagementService.vaccinationCenterWithId(req.params.vaccination_center_id);
	res.send(vaccinationCenter);
}));

router.post("/", isAdmin,co.wrap(function*(req, res, next){
	let vaccinationCenter = yield VaccinationCenterManagementService.createVaccinationCenter(req.body);
	res.send(vaccinationCenter);
}));

router.put("/:vaccination_center_id",isAdmin, co.wrap(function*(req, res, next){
	let vaccinationCenter = yield VaccinationCenterManagementService.updateVaccinationCenter(req.params.vaccination_center_id,req.body);
	res.send(vaccinationCenter);
}));

router.delete("/:vaccination_center_id", isAdmin,co.wrap(function*(req, res, next){
	yield VaccinationCenterManagementService.deleteVaccinationCenter(req.params.vaccination_center_id);
	res.send({});
}));

router.get("/:vaccination_center_id/admins", co.wrap(function*(req, res, next){
	let vaccinationCenters = yield VaccinationCenterManagementService.admins(req.params.vaccination_center_id);
	res.send(vaccinationCenters);
}));

router.post("/:vaccination_center_id/admins", isAdmin,co.wrap(function*(req, res, next){
	let vaccinationCenter = yield VaccinationCenterManagementService.createAdmin(req.params.vaccination_center_id,req.body);
	res.send(vaccinationCenter);
}));

router.delete("/:vaccination_center_id/admins/:admin_id", isAdmin,co.wrap(function*(req, res, next){
	yield VaccinationCenterManagementService.deleteAdmin(req.params.admin_id,req.params.vaccination_center_id);
	res.send({});
}));



module.exports = router;