var Router = require("express").Router
const createError = require('http-errors');
var router = Router();
const CollectionManagementService = require("../services/collection");



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
		let collections = yield CollectionManagementService.collections(query, page);
		res.send(collections);
	}
	else {
		let collections = yield CollectionManagementService.collections(query);
		res.send(collections);
	}
}));

router.get("/:collection_id", httpCoWrap(function* (req, res, next) {
	let collection = yield CollectionManagementService.collectionWithId(req.params.collection_id);
	res.send(collection);
}));




router.post("/", httpCoWrap(function* (req, res, next) {
	let collection = yield CollectionManagementService.createCollection(req.body);
	res.send(collection);
}));

router.put("/:collection_id", httpCoWrap(function* (req, res, next) {
	let collection = yield CollectionManagementService.updateCollection(req.params.collection_id, req.body);
	res.send(collection);
}));

module.exports = router;