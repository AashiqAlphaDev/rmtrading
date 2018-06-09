var Router = require("express").Router
var router = Router();
const co = require("co");
const DiseaseManagementService = require("../services/diseases")
const isAdmin = require("./super-admin/check-admin")

router.get("/", co.wrap(function*(req, res, next){
	var query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let diseases = yield DiseaseManagementService.diseases(query);
	res.send(diseases);
}));

router.get("/:disease_id", co.wrap(function*(req, res, next){
	let disease = yield DiseaseManagementService.diseaseWithId(req.params.disease_id);
	res.send(disease);
}));

router.post("/",isAdmin, co.wrap(function*(req, res, next){
	let disease = yield DiseaseManagementService.createDisease(req.body);
	res.send(disease);
}));

router.put("/:disease_id", isAdmin,co.wrap(function*(req, res, next){
	let disease = yield DiseaseManagementService.updateDisease(req.params.disease_id,req.body);
	res.send(disease);
}));

router.delete("/:disease_id", isAdmin, co.wrap(function*(req, res, next){
	yield DiseaseManagementService.deleteDisease(req.params.disease_id);
	res.send({});
}));


module.exports = router;