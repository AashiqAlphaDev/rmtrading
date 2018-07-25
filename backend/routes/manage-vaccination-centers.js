var Router = require("express").Router;
var router = Router();
const co = require("co");
const VaccinationCenterManagementService = require("../services/vaccination-centers");
const isAdmin = require("./super-admin/check-admin");
const isCenterAdmin = require("./check-center-admin");

router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	if (req.query.q) {
		query.name = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
	}
	let vaccinationCenters = yield VaccinationCenterManagementService.vaccinationCenters(query);
	res.send(vaccinationCenters);
}));

router.get("/:vaccination_center_id", httpCoWrap(function* (req, res, next) {
	if (req.params.vaccination_center_id == "self") {
		req.params.vaccination_center_id = req.session.center_id;
	}
	let vaccinationCenter = yield VaccinationCenterManagementService.vaccinationCenterWithId(req.params.vaccination_center_id);
	res.send(vaccinationCenter);
}));

router.post("/", isAdmin, httpCoWrap(function* (req, res, next) {
	let vaccinationCenter = yield VaccinationCenterManagementService.createVaccinationCenter(req.body);
	res.send(vaccinationCenter);
}));

router.put("/:vaccination_center_id", isCenterAdmin, httpCoWrap(function* (req, res, next) {
	console.log("inside update")
	let vaccinationCenter = yield VaccinationCenterManagementService.updateVaccinationCenter(req.session.center_id, req.body);
	res.send(vaccinationCenter);
}));

//updateVaccinationCenterQueue
router.put("/:vaccination_center_id/queues/:queue_id", isCenterAdmin, httpCoWrap(function* (req, res, next) {
	let update = yield VaccinationCenterManagementService.updateVaccinationCenterQueue(req.params.vaccination_center_id, req.params.queue_id, req.body);
	res.send(update);
}));


router.delete("/:vaccination_center_id", isCenterAdmin, httpCoWrap(function* (req, res, next) {
	console.log("route",req.params.vaccination_center_id)
	yield VaccinationCenterManagementService.deleteVaccinationCenter(req.params.vaccination_center_id);
	res.send({});
}));

router.get("/:vaccination_center_id/admins", httpCoWrap(function* (req, res, next) {
	let vaccinationCenters = yield VaccinationCenterManagementService.admins(req.params.vaccination_center_id);
	res.send(vaccinationCenters);
}));

router.post("/:vaccination_center_id/admins", isAdmin, httpCoWrap(function* (req, res, next) {
	let vaccinationCenter = yield VaccinationCenterManagementService.createAdmin(req.params.vaccination_center_id, req.body);
	res.send(vaccinationCenter);
}));

router.delete("/:vaccination_center_id/admins/:admin_id", isAdmin, httpCoWrap(function* (req, res, next) {
	yield VaccinationCenterManagementService.deleteAdmin(req.params.admin_id, req.params.vaccination_center_id);
	res.send({});
}));


module.exports = router;