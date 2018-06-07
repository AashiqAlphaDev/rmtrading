var Router = require("express").Router
var router = Router();
const co = require("co");
const vaccinationCenterService = require("../../services/vaccinationCenters");

router.get("/", co.wrap(function*(req, res, next) {
	let result = yield vaccinationCenterService.vaccineCenters(req.query.query, req.query.page);
	res.send(result);
}));

router.post("/", co.wrap(function*(req, res, next) {
	let center = yield vaccinationCenterService.createVaccineCenter(req.body);
	res.send(center);
}));

router.get("/:center_id", co.wrap(function*(req, res, next) {
	let result = yield vaccinationCenterService.vaccineCentersWithId(req.params.center_id);
	res.send(result);
}));

router.post("/:center_id", co.wrap(function*(req, res, next) {
	console.log(req.params.center_id, req.body)
	let result = yield vaccinationCenterService.updateVaccineCenter(req.params.center_id, req.body);
	res.send(result);
}));

router.delete("/:center_id", co.wrap(function*(req, res, next) {
	yield vaccinationCenterService.deleteVaccineCenter(req.param.center_id);
	res.send({});
}));

module.exports = router;