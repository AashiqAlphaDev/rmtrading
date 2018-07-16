var Router = require("express").Router
const createError = require('http-errors');
var router = Router();
const UsersManagementService = require("../services/user");
const haveCenterAccess = require("./check-center-access")


router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	if (req.query.q) {
		var name = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
		var email = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
		var mobile = {$regex: `.*${req.query.q}.*`, '$options': 'i'}
		query = {$or:[{name}, {email}, {mobile}]};
	}
	if (req.query.pagefrontend/pages/dashboard/pets/index.js && req.query.limit) {
		var page = {};
		page.page = parseInt(req.query.page);
		page.limit = parseInt(req.query.limit);
		let users = yield UsersManagementService.users(query, page);
		res.send(users);
	}
	else {
		let users = yield UsersManagementService.users(query);
		res.send(users);
	}
}));

router.get("/:user_id", haveCenterAccess, httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.userWithId(req.params.user_id);
	res.send(user);
}));

router.get("/by-mobile-or-gov-id/:query", haveCenterAccess, httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.userByMobileNoOrGovId(req.params.query);
	if (user) {
		res.send(user);
	}
	else {
		let error = createError(204);
		error.message = "No Matches";
		throw error;
	}
}));

router.get("/by-mobile/:mobile_number", haveCenterAccess, httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.userByMobileNo(req.params.mobile_number);
	res.send(user);
}));

router.get("/by-gov-id/:gov_id", haveCenterAccess, httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.userByGovernmentId(req.params.gov_id);
	res.send(user);
}));

router.get("/by-email/:email", haveCenterAccess, httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.userByEmail(req.params.email);
	res.send(user);
}));

router.post("/", haveCenterAccess, httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.createUser(req.body);
	res.send(user);
}));

router.put("/:user_id", haveCenterAccess, httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.updateUser(req.params.user_id, req.body);
	res.send(user);
}));

module.exports = router;