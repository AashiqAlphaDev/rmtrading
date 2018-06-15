const mongoose = require("mongoose");
const User = mongoose.model('User');
const emailer = require("./emailer");

module.exports.userByGovernmentId = function *(government_issued_id) {
    queryValidate(government_issued_id,"you missed government_issued_id.");

	return yield User.findOne({"profile.government_issued_id":government_issued_id}).exec();
};

module.exports.userByEmail = function *(email) {
    queryValidate(email,"you missed email.");
	return yield User.findOne({email}).exec();
};

module.exports.userByMobileNo = function *(mobile_number) {
    queryValidate(mobile_number,"you missed mobile_number.");
	return yield User.findOne({"profile.mobile_number":mobile_number}).exec();
};

module.exports.createUser = function *(userData) {
    validate(userData, ["email"], "you missed <%=param%>.");
	userData.email_verified = false;
	userData.password = null;
	yield emailer.send({
		to: userData.email,
		from: 'aashiq@appsfly.io',
		subject: `Welcome to Pet Piper`,
		html: `<p align="center"> Welcome to pet piper. Please verify your Account by clicking here. </p>`
	});
	return yield User.create(userData);
};

module.exports.updateUser = function *(userId,userData) {
    queryValidate(userId,"you missed user-id.");
	return yield User.update({_id:userId},userData);
};

module.exports.userWithId = function *(userId) {
    queryValidate(userId,"you missed user-id.");

    return yield User.findOne({_id:userId});
};

module.exports.users = function*(query={}, page){
	return yield User.paginate(query, page);
};





