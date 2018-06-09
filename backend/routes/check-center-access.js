var co = require("co");

var isCenterAccess = co.wrap(function*(req, res, next){
	if (req.session.user_id && req.session.center_id){
		next()
	}
	else{
		res.status(401).send({});
	}
});


module.exports = isCenterAccess