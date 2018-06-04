const mongoose = require("mongoose");
const User = mongoose.model("User");


module.exports.authenticateUser = function*(credientials){
    return yield User.findOne({password:credientials.email, password:credientials.password});
}

module.exports.registerUser = function*(email, password){
    return yield User.create({email, name, password})
}


module.exports.createUser = function*(email){
	let user = yield User.findOne({email});
	if (user) {
	    return user;
	    throw {message:"User already exist"}
    }
	return yield User.create({email})
}

module.exports.createUser = function*(email){
	return yield User.create({email})
}