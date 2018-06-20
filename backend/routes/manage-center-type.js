var Router = require("express").Router
var router = Router();
const co = require("co");
const CenterTypeManagementService = require("../services/center-types")
const isAdmin = require("./super-admin/check-admin")

router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	if (req.query.q) {
		query.name = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
	}
	let centerType = yield CenterTypeManagementService.centerTypes(query);
	res.send(centerType);
}));

router.get("/:centerType_id", httpCoWrap(function* (req, res, next) {
	let centerType = yield CenterTypeManagementService.centerTypeWithId(req.params.centerType_id);
	res.send(centerType);
}));

router.post("/", isAdmin, httpCoWrap(function* (req, res, next) {
	let centerType = yield CenterTypeManagementService.createCenterType(req.body);
	res.send(centerType);
}));

router.put("/:centerType_id", isAdmin, httpCoWrap(function* (req, res, next) {
	let centerType = yield CenterTypeManagementService.updateCenterType(req.params.centerType_id, req.body);
	res.send(centerType);
}));

router.delete("/:centerType_id", isAdmin, httpCoWrap(function* (req, res, next) {
	yield CenterTypeManagementService.deleteCenterType(req.params.centerType_id);
	res.send({});
}));


module.exports = router;