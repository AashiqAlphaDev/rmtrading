var Router = require("express").Router;
var router = Router();
const co = require("co");
const RequestsManagementService = require("../services/request");
const isCenterAdmin = require("./check-center-admin")
const isAdmin = require("./super-admin/check-admin")

router.get("/", isAdmin, httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	if (req.query.q) {
		query.name = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
	}
	if (req.query.page && req.query.limit) {
		var page = {};
		page.page = parseInt(req.query.page);
		page.limit = parseInt(req.query.limit);
		let requests = yield RequestsManagementService.requests(query, page);
		res.send(requests);
	}
	else {
		let requests = yield RequestsManagementService.requests(query);
		res.send(requests);
	}
}));

router.get("/", isCenterAdmin, httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {center: req.session.center_id};
	if (req.query.q) {
		query.name = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
	}
	if (req.query.page && req.query.limit) {
		var page = {};
		page.page = parseInt(req.query.page);
		page.limit = parseInt(req.query.limit);
		let requests = yield RequestsManagementService.requests(query, page);
		res.send(requests);
	}
	else {
		let requests = yield RequestsManagementService.requests(query);
		res.send(requests);
	}
}));

router.get("/:request_id", isCenterAdmin, httpCoWrap(function* (req, res, next) {
	let request = yield RequestsManagementService.requestWithId(req.params.request_id);
	res.send(request);
}));

router.post("/", isCenterAdmin, httpCoWrap(function* (req, res, next) {
	let request = yield RequestsManagementService.createRequest(req.body);
	res.send(request);
}));

router.put("/:request_id", isAdmin, httpCoWrap(function* (req, res, next) {
	let request = yield RequestsManagementService.updateRequest(req.params.request_id, req.body);
	res.send(request);
}));


module.exports = router;