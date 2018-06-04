var Router = require("express").Router
var router = Router();
var co = require("co");
let sessionStore = require("../../session-store");

var isAdmin = co.wrap(function*(req, res, next){
	if (req.session.isAdmin){
		next()
	}
	else{
		res.status(401).send({});
	}
});

router.post("/login", co.wrap(function*(req, res, next) {
	if(req.body.username == process.env.SUPER_ADMIN_USER && req.body.password == process.env.SUPER_ADMIN_PASSWORD){
		req.session.isAdmin = true;
		res.send({sessionID:req.sessionID});
	}
	else{
		req.session.isAdmin = false;
		res.status(401).send({});
	}
}));

router.get("/logout/:session_id", co.wrap(function*(req, res, next) {
	sessionStore.get(req.params.session_id, function (err,session) {
		if(err || !session){
			res.send({});
			return
		}
		session.isAdmin = false;
		sessionStore.set(req.params.session_id, session, function (err) {
			if(!err){
				res.send({});
			}
			else{
				next(err);
			}
		})
	});
}));

router.get("/", co.wrap(function*(req, res, next) {
	if (req.session.isAdmin) {
		res.send({base:"root"});
	}
	else{
		res.status(401).send({});
	}
}));

router.get("/session-check/:session_id", co.wrap(function*(req, res, next) {
	sessionStore.get(req.params.session_id, function (err,session) {
		if(!session){
            res.status(401).send({});
            return
		}
		if (session.isAdmin) {
			res.send({base:"root"});
		}
		else{
			res.status(401).send({});
		}
	});
}));




module.exports = router