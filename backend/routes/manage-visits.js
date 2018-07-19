var Router = require("express").Router
var router = Router({mergeParams: true});
const VisitManagementService = require("../services/visits")


router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	if (req.query.q) {
		query.name = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
	}
	let visits = yield VisitManagementService.visits(req.params.pet_id,query);
	res.send(visits);
}));

router.get("/:visit_id", httpCoWrap(function* (req, res, next) {
	let visit = yield VisitManagementService.visitWithId(req.params.visit_id);
	res.send(visit);
}));

router.post("/", httpCoWrap(function* (req, res, next) {
    req.body.vet_center = req.session.center_id;
	let visit = yield VisitManagementService.createVisit(req.params.pet_id,req.body);
	res.send(visit);
}));

router.put("/:visit_id", httpCoWrap(function* (req, res, next) {

	let visit = yield VisitManagementService.updateVisit(req.params.visit_id, req.body);
	res.send(visit);
}));

router.delete("/:visit_id", httpCoWrap(function* (req, res, next) {
	yield VisitManagementService.deleteVisit(req.params.visit_id);
	res.send({});
}));


module.exports = router;