const createError = require('http-errors');
const mongoose = require("mongoose");
const User = mongoose.model("User");
const VaccinationCenterAdmin = mongoose.model("VaccinationCenterAdmin");
const md5 = require("md5");
const emailer = require("./emailer");

module.exports.authenticateUser = function*(credientials){
    validate(credientials, ["email", "password"], "You missed <%=param%>.");
	return yield User.findOne({email:credientials.email, password:md5(credientials.password)}).exec();
};

module.exports.adminOfCenters = function*(email){
	return yield VaccinationCenterAdmin.find({email:email}).exec()
}

module.exports.registerUser = function*(userData){

    validate(userData, ["email","name","password"], "You missed <%=param%>.");
    userData.password = md5(userData.password);
	let existingUser = yield User.findOne({email:userData.email}).exec();
	if (existingUser) {
		yield User.update({email:userData.email},{password:userData.password});
        let error = createError(400);
        error.message = "User with this email is already registered.";
        throw error;
	}
	yield emailer.send({
		to: userData.email,
		from: 'aashiq@appsfly.io',
		subject: `Welcome to Pet Piper`,
		html: `<p align="center"> Welcome to pet piper. Please verify your Account by clicking here. </p>`
	});
	userData.email_verified=false;
    return yield User.create(userData);
};

module.exports.resetPassword = function*(userData){

    validate(userData, ["email"], "You missed <%=param%>.");
    let existingUser = yield User.findOne({email:userData.email}).exec();

    yield emailer.send({
        to: userData.email,
        from: 'aashiq@appsfly.io',
        subject: `Reset Password - Pet Piper`,
        html: `<a align="center"> Hey it seems like you have forgotten your password. Please reset your Account password by clicking <a href="${existingUser.id}/resetPassword">here.</a> </p>`
    });
    userData.resetPasswordInProgress=true;

    return yield User.create(userData);
};






