var Router = require("express").Router
var router = Router({mergeParams: true});
const ClaimManagementService = require("../services/claims")


router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	if (req.query.q) {
		query.name = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
	}
	let claims = yield ClaimManagementService.claims(req.params.query_id,query);
	res.send(claims);
}));

router.get("/:claim_id", httpCoWrap(function* (req, res, next) {
	let claim = yield ClaimManagementService.claimWithId(req.params.claim_id);
	res.send(claim);
}));

router.post("/", httpCoWrap(function* (req, res, next) {

	let claim = yield ClaimManagementService.createClaim(req.body);
	res.send(claim);
}));

router.put("/:claim_id", httpCoWrap(function* (req, res, next) {

	let claim = yield ClaimManagementService.updateClaim(req.params.claim_id, req.body);
	res.send(claim);
}));

router.delete("/:claim_id", httpCoWrap(function* (req, res, next) {
	yield ClaimManagementService.deleteAll(req.params.claim_id);
	res.send({});
}));


module.exports = router;