var co = require("co");

var isCenterAdmin = httpCoWrap(function*(req, res, next){
	if (req.session.user_id && req.session.center_id && req.session.isCenterAdmin){
		next()
	}
	else{
		res.status(401).send({});
	}
});


module.exports = isCenterAdmin;