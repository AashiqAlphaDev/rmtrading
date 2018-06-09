var Router = require("express").Router
var router = Router();
const co = require("co");
const VaccinesManagementService = require("../services/vaccines")
const isAdmin = require("./super-admin/check-admin")

router.get("/", co.wrap(function*(req, res, next){
	var query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let diseases = yield VaccinesManagementService.vaccines(query);
	res.send(diseases);
}));

router.get("/:vaccine_id", co.wrap(function*(req, res, next){
	let disease = yield VaccinesManagementService.vaccineWithId(req.params.vaccine_id);
	res.send(disease);
}));

router.post("/",isAdmin, co.wrap(function*(req, res, next){
	let disease = yield VaccinesManagementService.createVaccine(req.body);
	res.send(disease);
}));

router.put("/:vaccine_id",isAdmin, co.wrap(function*(req, res, next){
	let disease = yield VaccinesManagementService.updateVaccine(req.params.vaccine_id,req.body);
	res.send(disease);
}));

router.delete("/:vaccine_id",isAdmin, co.wrap(function*(req, res, next){
	yield VaccinesManagementService.deleteVaccine(req.params.vaccine_id);
	res.send({});
}));


module.exports = router;