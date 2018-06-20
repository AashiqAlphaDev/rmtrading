const mongoose = require("mongoose")
const Appointment = mongoose.model('Appointment');
const VaccintionCenter = mongoose.model('VaccinationCenter');


module.exports.createAppointment = function* (appointmentData) {
	validate(appointmentData, ["center"], "You missed <%=param%>.");
	let vaccinationCenter = yield VaccintionCenter.findOne({_id: appointmentData.center}).exec();
	let existingAppointment = yield Appointment.findOne({name: appointmentData.name});
	if (existingAppointment) {
		return existingAppointment;
	}
	return yield Appointment.create(appointmentData);
};

module.exports.updateAppointment = function* (id, appointmentData) {
	queryValidate(id, "You missed appointment-id.");
	return yield Appointment.update({_id: id}, appointmentData);
};

module.exports.deleteAppointment = function* (appointmentId) {
	queryValidate(appointmentId, "You missed appointment-id.");

	return yield Appointment.remove({_id: appointmentId});
};

module.exports.appointments = function* (query = {}) {
	return yield Appointment.find(query).exec();
};

module.exports.appointmentWithId = function* (appointmentId) {
	queryValidate(appointmentId, "You missed appointment-id.");
	return yield Appointment.findOne({_id: appointmentId}).exec();
};

module.exports.appointmentWithName = function* (name) {
	queryValidate(name, "You missed name.");
	return yield Appointment.findOne({name: name}).exec();
};

module.exports.deleteAll = function* () {
	return yield Appointment.remove({});
};

