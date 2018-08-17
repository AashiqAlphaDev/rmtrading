var Router = require("express").Router
const createError = require('http-errors');
var router = Router();
const TagManagementService = require("../services/tag");



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
		let tags = yield TagManagementService.Tags(query, page);
		res.send(tags);
	}
	else {
		let tags = yield TagManagementService.Tags(query);
		res.send(tags);
	}
}));

router.get("/:tag_id", httpCoWrap(function* (req, res, next) {
	let tag = yield TagManagementService.TagWithId(req.params.tag_id);
	res.send(tag);
}));




router.post("/", httpCoWrap(function* (req, res, next) {
	let tag = yield TagManagementService.createTag(req.body);
	res.send(tag);
}));

router.put("/:tag_id", httpCoWrap(function* (req, res, next) {
	let tag = yield TagManagementService.updateTag(req.params.tag_id, req.body);
	res.send(tag);
}));

module.exports = router;