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
}