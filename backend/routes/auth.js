var authService = require("../services/auth")
var Router = require("express").Router
var router = Router();
var co = require("co");

router.post("/register", co.wrap(function*(req, res, next){
    try{
	    yield authService.registerUser(req.body);
	    res.send({});
    }catch (e) {
	    res.status(e.statusCode).send({message:e.message});
    }
}));

router.delete("/logout", co.wrap(function*(req, res, next){
	delete req.session.user_id;
	res.send({})
}));

router.post("/login", co.wrap(function*(req, res, next){
	var result = yield authService.authenticateUser(req.body);
	if(result){
	    req.session.user_id = result._id;
		res.send({session_id:req.sessionID});
    }
    else{
		res.status(401).send({});
    }
}));

module.exports = router;






