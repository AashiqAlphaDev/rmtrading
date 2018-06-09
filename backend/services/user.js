const mongoose = require("mongoose");
const User = mongoose.model('User');
const emailer = require("./emailer");

module.exports.userByGovernmentId = function *(government_issued_id) {
	console.log(government_issued_id)
	return yield User.findOne({"profile.government_issued_id":government_issued_id}).exec();
};

module.exports.userByEmail = function *(email) {
	return yield User.findOne({email}).exec();
};

module.exports.userByMobileNo = function *(mobile_number) {
	console.log(mobile_number)
	return yield User.findOne({"profile.mobile_number":mobile_number}).exec();
};

module.exports.createUser = function *(userData) {
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
	return yield User.update({_id:userId},userData);
};

module.exports.userWithId = function *(userId) {
	return yield User.findOne({_id:userId});
};

module.exports.users = function*(query={}, page){
	return yield User.paginate(query, page);
};