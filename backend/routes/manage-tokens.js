var Router = require("express").Router
var router = Router();
const co = require("co");
const TokenManagementService = require("../services/token")
const isAdmin = require("./super-admin/check-admin")
const hasCenterAccess = require("./check-center-access")

router.get("/", co.wrap(function*(req, res, next){
	var query = req.query.query?req.query.query:{};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let tokens = yield TokenManagementService.tokens(query);
	res.send(tokens);
}));

router.get("/:token_id", co.wrap(function*(req, res, next){
	let token = yield TokenManagementService.tokenWithId(req.params.token_id);
	res.send(token);
}));

router.post("/",isAdmin, co.wrap(function*(req, res, next){
	let token = yield TokenManagementService.createToken(req.body);
	res.send(token);
}));

router.put("/:token_id", hasCenterAccess,co.wrap(function*(req, res, next){
	try{
		let token = yield TokenManagementService.updateToken(req.params.token_id,req.body);
		res.send(token);
	}catch(err){
		res.status(err.statusCode).send({message:err.message});
	}
}));

router.delete("/:token_id", isAdmin, co.wrap(function*(req, res, next){
	yield TokenManagementService.deleteToken(req.params.token_id);
	res.send({});
}));


module.exports = router;