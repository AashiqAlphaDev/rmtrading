const mongoose = require("mongoose");
const User = mongoose.model('User');
const createError = require('http-errors');



module.exports.userByEmail = function* (email) {
	return yield User.findOne({email}).exec();
};

module.exports.userByMobileNo = function* (mobile_number) {
	return yield User.findOne({"profile.mobile_number": mobile_number}).exec();
};

module.exports.createUser = function* (userData) {
    let existingUser = yield User.findOne({$or: [
        {profile:{mobile_number: userData.profile.mobile_number}},
        {email:userData.email}
    ]}).exec();
    if (existingUser) {
        let error = createError(400);
        error.message = "User Already Exists";
        error.data = existingUser;
        throw error;
    }
	userData.email_verified = false;
	return yield User.create(userData);
};

module.exports.updateUser = function* (userId, userData) {
	queryValidate(userId, "You missed user-id.");
	return yield User.update({_id: userId}, userData);
};

module.exports.userWithId = function* (userId) {
	queryValidate(userId, "You missed user-id.");
	return yield User.findOne({_id: userId});
};

module.exports.users = function* (query = {}, page) {
	return yield User.paginate(query, page);
};





