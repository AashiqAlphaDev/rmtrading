var Router = require("express").Router
const createError = require('http-errors');
var router = Router();
const LinkManagementService = require("../services/link");



router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	if (req.query.q) {
		var name = {$regex: `.*^${req.query.q}.*`, '$options': 'i'};
		var email = {$regex: `.*^${req.query.q}.*`, '$options': 'i'};
		var mobile_number = {$regex: `.*^${req.query.q}.*`, '$options': 'i'};
		query = {$or:[{profile:{name}},{email},{profile:{mobile_number}}]};
	}
	if (req.query.page && req.query.limit) {
		var page = {};
		page.page = parseInt(req.query.page);
		page.limit = parseInt(req.query.limit);
		let links = yield LinkManagementService.Links(query, page);
		res.send(links);
	}
	else {
		let links = yield LinkManagementService.Links(query);
		res.send(links);
	}
}));

router.get("/:link_id", httpCoWrap(function* (req, res, next) {
	let link = yield LinkManagementService.LinkWithId(req.params.link_id);
	res.send(link);
}));




router.post("/", httpCoWrap(function* (req, res, next) {
	let link = yield LinkManagementService.createLink(req.body);
	res.send(link);
}));

router.put("/:link_id", httpCoWrap(function* (req, res, next) {
	let link = yield LinkManagementService.updateLink(req.params.link_id, req.body);
	res.send(link);
}));

module.exports = router;