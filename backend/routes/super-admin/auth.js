var Router = require("express").Router
var router = Router();
var co = require("co");
let sessionStore = require("../../session-store");

router.post("/login", co.wrap(function* (req, res, next) {


	if (req.body.username == process.env.SUPER_ADMIN_USER && req.body.password == process.env.SUPER_ADMIN_PASSWORD) {
		req.session.isAdmin = true;
		res.send({sessionID: req.sessionID});
	}
	else {
		req.session.isAdmin = false;
		res.status(401).send({message: "You have entered the wrong username and password"});
	}
}));

router.get("/logout", co.wrap(function* (req, res, next) {
	req.session.isAdmin = false;
	res.send({})
}));

router.get("/", co.wrap(function* (req, res, next) {
	if (req.session.isAdmin) {
		res.send({base: "root"});
	}
	else {
		res.status(401).send({});
	}
}));

router.get("/session-check/:session_id", co.wrap(function* (req, res, next) {
	sessionStore.get(req.params.session_id, function (err, session) {
		if (!session) {
			res.status(401).send({});
			return
		}
		if (session.isAdmin) {
			res.send({base: "root"});
		}
		else {
			res.status(401).send({});
		}
	});
}));

module.exports = router;