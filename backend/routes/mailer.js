var Router = require("express").Router
var router = Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");




router.get("/emailer/verification", function(req, res, next) {

    const msg = {
        to: 'aashiqalimohammed@gmail.com',
        from: 'aashiq@appsfly.io',
        subject: 'PetPiper : Verify Your Email',
        html: '<p align="center"> Please verify your email ID <p> <img src="http://www.supercoloring.com/sites/default/files/silhouettes/2015/05/dog-paws-deep-sky-blue-silhouette.svg" alt="">'


    };


    sgMail.send(msg, function (err) {
        if (err) {
            res.send({text: "Error sending Verification message"})
        }
        res.send({text: "Verification Sent"})

    });
});
router.get("/emailer/welcome", function(req, res, next) {

    const msg = {
        to: 'aashiqalimohammed@gmail.com',
        from: 'aashiq@appsfly.io',
        subject: 'Welcome to PetPiper',
        html: '<p>Welcome to PetPiper  <p>',
    };


    sgMail.send(msg, function (err) {
        if (err) {
            res.send({text: "Error Sending Welcome Message"})
        }
        res.send({text: "Welcome message Sent"})

    });
});
router.get("/emailer/resetPassword", function(req, res, next) {
    const msg = {
        to: 'aashiqalimohammed@gmail.com',
        from: 'aashiq@appsfly.io',
        subject: 'PetPiper : Reset Password',
        html: '<p>Please Reset your password <p>',
    };

    sgMail.send(msg, function (err) {
        if (err) {
            res.send({text: "Error Sending Reset Password Message"})
        }
        res.send({text: "Reset password Mailer Sent"})

    });
});
router.get("/emailer/vaccinationAlert", function(req, res, next) {
    const msg = {
        to: 'aashiqalimohammed@gmail.com',
        from: 'aashiq@appsfly.io',
        subject: 'PetPiper : Alert for vaccination',
        html: '<p>Here is your vaccination alert<p>',
    };

    sgMail.send(msg, function (err) {
        if (err) {
            res.send({text: "Error sending Vaccination Alert"})
        }
        res.send({text: "Vaccination Alert Sent"})

    });
});





module.exports = router;

