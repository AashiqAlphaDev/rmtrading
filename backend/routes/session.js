var Router = require("express").Router
var router = Router();
const co = require("co");
var adminService = require("../services/admin")

router.post("/select-vaccination-center", httpCoWrap(function*(req, res, next){
	if(!req.session.user_id){
		res.status(401).send({});
		return;
	}
	let isAdmin = yield adminService.checkAdmin(req.session.user_id, req.body.center_id);
	let isStaff = false;
	if(!isAdmin){
		isStaff = yield adminService.checkStaff(req.session.user_id, req.body.center_id);
	}
	if(isAdmin || isStaff){
		req.session.center_id = req.body.center_id;
		req.session.isCenterAdmin = isAdmin;
		res.send({});
	}
	else{
		res.status(401).send({});
	}
}));



module.exports = router;