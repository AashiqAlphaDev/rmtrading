var Router = require("express").Router
var router = Router();
const UsersManagementService = require("../services/user");



router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	let users = yield UsersManagementService.users(query);
	res.send(users);
}));

router.get("/:user_id", httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.userWithId(req.params.user_id);
	res.send(user);
}));

router.post("/", httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.createUser(req.body);
	res.send(user);
}));

router.put("/:user_id", httpCoWrap(function* (req, res, next) {
	let user = yield UsersManagementService.updateUser(req.params.user_id, req.body);
	res.send(user);
}));

module.exports = router;