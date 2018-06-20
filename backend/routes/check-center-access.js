var co = require("co");

var isCenterAccess = httpCoWrap(function*(req, res, next){
	console.log(req.session);
	if (req.session.user_id && req.session.center_id){
		next()
	}
	else{
		res.status(401).send({});
	}
});


module.exports = isCenterAccess



