const createError = require('http-errors');
const mongoose = require("mongoose");
const User = mongoose.model("User");
const md5 = require("md5");
const emailer = require("./emailer");

module.exports.authenticateUser = function*(credientials){
    return yield User.findOne({email:credientials.email, password:md5(credientials.password)}).exec();
};

module.exports.registerUser = function*({email, name, password}){
	password = md5(password);
	let existingUser = yield User.findOne({email:email}).exec();
	if (existingUser) {
		yield User.update({email:email},{password});
        let error = createError(400);
        error.message = "User with this email is already registered.";
        throw error;
	}
	yield emailer.send({
		to: email,
		from: 'aashiq@appsfly.io',
		subject: `Welcome to Pet Piper`,
		html: `<p align="center"> Welcome to pet piper. Please verify your Account by clicking here. </p>`
	});
    return yield User.create({email, name, password, email_verified:false});
};