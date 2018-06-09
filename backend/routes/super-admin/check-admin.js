var co = require("co");

var isAdmin = co.wrap(function*(req, res, next){
	if (req.session.isAdmin){
		next()
	}
	else{
		res.status(401).send({});
	}
});



module.exports = isAdmin