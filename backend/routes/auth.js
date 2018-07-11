var authService = require("../services/auth")
var Router = require("express").Router
var router = Router();


router.post("/register", httpCoWrap(function* (req, res, next) {
	yield authService.registerUser(req.body);
	res.send({});
}));

router.delete("/logout", httpCoWrap(function* (req, res, next) {
	delete req.session.user_id;
	res.send({})
}));

router.post("/login", httpCoWrap(function* (req, res, next) {
	var result = yield authService.authenticateUser(req.body);
	if (result) {
		var centers = yield authService.adminOfCenters(result.email);
		if (centers.length == 1) {
			req.session.isCenterAdmin = true;
			req.session.center_id = centers[0].vaccination_center;
		}
		req.session.user_id = result._id;
		res.send({session_id: req.sessionID});
	} else {
		res.status(401).send({message: "You have entered the wrong username and password"});
	}
}));

router.get("/admin", httpCoWrap(function* (req, res, next) {
	if (req.session.user_id && req.session.isCenterAdmin) {
		res.send({base: "root"});
	}
	else {
		res.status(401).send({});
	}
}));

router.get("/reset-password", httpCoWrap(function* (req, res, next) {
	yield authService.resetPassword(req.body);
	res.send({});
}));

module.exports = router;