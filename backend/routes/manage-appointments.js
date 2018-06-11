var Router = require("express").Router
var router = Router({mergeParams: true});
const co = require("co");
const vaccinationCenterManagementService = require("../services/vaccination-centers")

router.get("/available", co.wrap(function *(req, res, next) {
	var appointments = yield vaccinationCenterManagementService.availableAppointmentSlots(req.params.center_id, new Date(req.query.date));
	res.send(appointments);
}));

router.get("/", co.wrap(function *(req, res, next) {
	if (req.session.user_id && req.session.center_id) {
		var appointments = yield vaccinationCenterManagementService.appointments(req.params.center_id, new Date(req.query.date));
		res.send(appointments);
	}
	else{
		next();
	}
}));

router.get("/", co.wrap(function *(req, res, next) {
	var appointments = yield vaccinationCenterManagementService.appointments(req.params.center_id, new Date(req.query.date), req.session.user_id);
	res.send(appointments);
}));

router.post("/", co.wrap(function *(req, res, next) {
	try{
		var appointments = yield vaccinationCenterManagementService.bookAppointment(req.body);
		res.send(appointments);
	} catch(err){
		res.status(err.statusCode).send({message:err.message});
	}
}));


router.delete("/:appointment_id", co.wrap(function *(req, res, next) {
	if (req.session.user_id && req.session.center_id) {
		try{
			var appointments = yield vaccinationCenterManagementService.cancelAppointment(req.params.appointment_id);
			res.send(appointments);
		} catch(err){
			res.status(err.statusCode).send({message:err.message});
		}
	}
	else{
		next()
	}
}));


router.delete("/:appointment_id", co.wrap(function *(req, res, next) {
	try{
		var appointments = yield vaccinationCenterManagementService.cancelAppointment(req.params.appointment_id, req.sesion.user_id);
		res.send(appointments);
	} catch(err){
		res.status(err.statusCode).send({message:err.message});
	}
}));

module.exports = router;