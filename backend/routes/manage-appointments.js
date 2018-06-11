var Router = require("express").Router
var router = Router();
const co = require("co");
const VaccinesManagementService = require("../services/vaccines")
const isAdmin = require("./super-admin/check-admin")

router.get("/", co.wrap(function*(req, res, next){
	var query = req.query.query?req.query.query:{};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	if(req.query.page && req.query.limit){
		var page = {};
		page.page = parseInt(req.query.page);
		page.limit = parseInt(req.query.limit);
		let pets = yield VaccinesManagementService.vaccines(query, page);
		res.send(pets);
	}
	else{
		let vaccines = yield VaccinesManagementService.vaccines(query);
		res.send(vaccines);
	}
}));

router.get("/:vaccine_id", co.wrap(function*(req, res, next){
	let vaccine = yield VaccinesManagementService.vaccineWithId(req.params.vaccine_id);
	res.send(vaccine);
}));

router.post("/",isAdmin, co.wrap(function*(req, res, next){
	let vaccine = yield VaccinesManagementService.createVaccine(req.body);
	res.send(vaccine);
}));

router.put("/:vaccine_id",isAdmin, co.wrap(function*(req, res, next){
	let vaccine = yield VaccinesManagementService.updateVaccine(req.params.vaccine_id,req.body);
	res.send(vaccine);
}));

router.delete("/:vaccine_id",isAdmin, co.wrap(function*(req, res, next){
	yield VaccinesManagementService.deleteVaccine(req.params.vaccine_id);
	res.send({});
}));


module.exports = router;