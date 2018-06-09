var Router = require("express").Router
var router = Router();
const co = require("co");
var adminService = require("../services/admin")


router.post("/select-vaccination-center", co.wrap(function*(req, res, next){
	if(!req.session.user_id){
		res.status(401).send({});
		return;
	}
	let isAdmin = yield adminService.checkAdmin(req.session.user_id, req.body.center_id);
	if(isAdmin){
		req.session.center_id = req.body.center_id;
		res.send({});
	}
	else{
		res.status(401).send({});
	}
}));

module.exports = router;