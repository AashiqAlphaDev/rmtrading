var Router = require("express").Router
var router = Router();
const co = require("co");
const DiseaseManagementService = require("../../services/diseases")

router.get("/", co.wrap(function*(req, res, next){
	var query = {}
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`}
	}
	let diseases = yield DiseaseManagementService.diseases(req.query);
	res.send(diseases);
}));

router.get("/:disease_id", co.wrap(function*(req, res, next){
	let disease = yield DiseaseManagementService.diseaseWithId(req.params.disease_id);
	res.send(disease);
}));

router.post("/", co.wrap(function*(req, res, next){
	let disease = yield DiseaseManagementService.createDisease(req.body);
	res.send(disease);
}));

router.put("/:disease_id", co.wrap(function*(req, res, next){
	let disease = yield DiseaseManagementService.updateDisease(req.params.disease_id,req.body);
	res.send(disease);
}));

router.delete("/:disease_id", co.wrap(function*(req, res, next){
	yield DiseaseManagementService.deleteDisease(req.params.disease_id);
	res.send({});
}));


module.exports = router;