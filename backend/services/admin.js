const mongoose = require("mongoose");
const User = mongoose.model("User");
const VaccinationCenterAdmin = mongoose.model("VaccinationCenterAdmin");
const VaccinationCenterStaff = mongoose.model("VaccinationCenterStaff");

module.exports.checkAdmin = function*(userId, centerId) {
	let user  = yield User.findOne({_id:userId}).exec();
	return yield VaccinationCenterAdmin.findOne({vaccination_center:centerId, email:user.email}).exec();
};

module.exports.checkStaff = function*(userId, centerId) {
	let user  = yield User.findOne({_id:userId}).exec();
	return yield VaccinationCenterStaff.findOne({vaccination_center:centerId, email:user.email}).exec();
};
