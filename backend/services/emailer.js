const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

module.exports.send = function*(msg) {
	return new Promise(function (resolve, reject) {
		sgMail.send(msg, function (err) {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};


module.exports.sendUserVerificationEmail = function*(email, name, verificationId) {
	return new Promise(function (resolve, reject) {
		sgMail.send({
			to:email,
			from:"help@immunify.me",
			subject:"Account Verification",
			substitutions:{
				name:name||""
			},
			templateId:"403f543f-d8d7-4262-853d-03a7119a89bd"
		}, function (err) {
			if (err) {
				reject(err);
			}
			resolve();
		});
	});
};



