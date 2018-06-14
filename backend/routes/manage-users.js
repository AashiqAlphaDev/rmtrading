var Router = require("express").Router
var router = Router();
const co = require("co");
const UsersManagementService = require("../services/user")

router.get("/", httpCoWrap(function*(req, res, next){
	var query = req.query.query?req.query.query:{};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	if(req.query.page && req.query.limit){
		var page = {};
		page.page = parseInt(req.query.page);
		page.limit = parseInt(req.query.limit);
		let users = yield UsersManagementService.users(query, page);
		res.send(users);
	}
	else{
		let users = yield UsersManagementService.users(query);
		res.send(users);
	}
}));

router.get("/:user_id", httpCoWrap(function*(req, res, next){
	let user = yield UsersManagementService.userWithId(req.params.user_id);
	res.send(user);
}));

router.get("/by-mobile/:mobile_number", httpCoWrap(function*(req, res, next){
	let user = yield UsersManagementService.userByMobileNo(req.params.mobile_number);
	res.send(user);
}));

router.get("/by-gov-id/:gov_id", httpCoWrap(function*(req, res, next){
	let user = yield UsersManagementService.userByGovernmentId(req.params.gov_id);
	res.send(user);
}));

router.get("/by-email/:email", httpCoWrap(function*(req, res, next){
	let user = yield UsersManagementService.userByEmail(req.params.email);
	res.send(user);
}));

router.post("/", httpCoWrap(function*(req, res, next){
	let user = yield UsersManagementService.createUser(req.body);
	res.send(user);
}));

router.put("/:user_id", httpCoWrap(function*(req, res, next){
	let user = yield UsersManagementService.updateUser(req.params.user_id,req.body);
	res.send(user);
}));

module.exports = router;