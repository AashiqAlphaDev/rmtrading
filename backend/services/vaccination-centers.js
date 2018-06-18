const mongoose = require("mongoose")
const VaccinationCenters = mongoose.model('VaccinationCenter');
const VaccinationCenterAdmins = mongoose.model('VaccinationCenterAdmin');
const Appointment = mongoose.model('Appointment');
const emailer = require("./emailer");
const _ = require("underscore");

module.exports.createVaccinationCenter = function*(vaccinationCenterData){
    validate(vaccinationCenterData, ["name","contact"], "You missed <%=param%>.");
	return yield VaccinationCenters.create(vaccinationCenterData);
};

module.exports.updateVaccinationCenter = function*(id, vaccinationCenterData){
    queryValidate(id,"You missed vaccination-center-id.");
    console.log(vaccinationCenterData);
	return yield VaccinationCenters.update({_id:id},vaccinationCenterData);
};

module.exports.deleteVaccinationCenter = function*(vaccinationCenterId){
    queryValidate(vaccinationCenterId,"You missed vaccination-center-id.");
	return yield VaccinationCenters.remove({_id:vaccinationCenterId});
};

module.exports.vaccinationCenters = function*(query={}, page){
	return yield VaccinationCenters.paginate(query, page);
};

module.exports.vaccinationCenterWithId = function*(vaccinationCenterId){
    queryValidate(vaccinationCenterId,"You missed vaccination-center-id.");
	return yield VaccinationCenters.findOne({_id:vaccinationCenterId}).exec();
};

module.exports.deleteAll = function*(){
	return yield VaccinationCenters.remove({});
};

module.exports.admins = function*(centerId){
    queryValidate(centerId,"You missed vaccination-center-id.");
	return yield VaccinationCenterAdmins.find({vaccination_center:centerId});
};


module.exports.bookAppointment = function*(appointmentData){
    validate(appointmentData, ["center","owner","queue_name","slot_index","date"], "You missed <%=param%>.");
	let extend = _.extend({},appointmentData);
	delete extend.owner;
	extend.status = {$ne:"cancelled"};
	let existingAppointment = yield Appointment.findOne(extend).exec();
	if(existingAppointment){
		let error = new Error();
		error.message = "Slot already booked.";
		error.statusCode = 400;
		throw error;
	}
	else{
		appointmentData.status="booked";
		return yield Appointment.create(appointmentData);
	}
}

module.exports.cancelAppointment = function*(appointmentId, userId){
    queryValidate(appointmentId,"You missed appointment-id.");
	let query = {_id:appointmentId};
	if (userId) {
		query.owner = userId;
	}
	console.log(query);
	return yield Appointment.update(query, {status:"cancelled"});
};

module.exports.appointments = function*(centerId, date, ownerId){
    queryValidate(centerId,"You missed center-id.");
    queryValidate(date,"You missed the date.");
    queryValidate(ownerId,"You missed owner-id.");

    let query = {center:centerId, date:date};
	if (ownerId) {
		query.owner = ownerId;
	}
	return yield Appointment.find(query).exec();
};

module.exports.availableAppointmentSlots = function*(centerId, date){
    queryValidate(centerId,"You missed center-id.");
    queryValidate(date,"You missed the date.");
	let center = yield VaccinationCenters.findOne({_id:centerId}).exec();
	let appointments = yield Appointment.find({center:centerId, date:date, status:{$ne:"cancelled"}});
	var slots ={};
	for(var queueIndex in center.queues){
		let queue = center.queues[queueIndex];
		for(var slotIndex in queue.time_slots){
			let slot = queue.time_slots[slotIndex];
			for(var i=slot.from;i<slot.to;i++){
				slots[`${queue.name}-${i}`] = true;
			}
		}
	}
	for(var appointmentIndex in appointments){
		var appointment = appointments[appointmentIndex];
		slots[`${appointment.queue_name}-${appointment.slot_index}`] = false;
	}
	var formattedSlots = {};
	for(var key in slots){
		if(!formattedSlots[key.split("-")[1]]){
			formattedSlots[key.split("-")[1]] = {}
		}
		(formattedSlots[key.split("-")[1]])[key.split("-")[0]] = slots[key];
	}
	var slotsArr = []
	for(var key in formattedSlots){
		slotsArr.push({slotIndex:parseInt(key), available:formattedSlots[key]});
	}
	return slotsArr;
};

module.exports.createAdmin = function*(centerId,adminData){
    queryValidate(adminData.email,"You missed the email.");

	let existingBreed = yield VaccinationCenterAdmins.findOne({vaccination_center:centerId, email:adminData.email});
	if(existingBreed){
		return existingBreed;
	}
	var vaccinationCenter = yield VaccinationCenters.findOne({_id:centerId}).exec();
	adminData.vaccination_center = centerId;
	adminData.status = "pending";
	yield emailer.send({
		to: adminData.email,
		from: 'aashiq@appsfly.io',
		subject: `Added as Administrator of ${vaccinationCenter.name}`,
		html: `<p align="center"> You are added as Administrator for ${vaccinationCenter.name}. You can access dashboard from <a href="${process.env.FRONTEND_HOST}/auth">here</a> </p>`
	});
	return yield VaccinationCenterAdmins.create(adminData);
};

module.exports.deleteAdmin = function*(adminId){
    queryValidate(adminId,"You missed the admin id.");
	return yield VaccinationCenterAdmins.remove({_id:adminId});
};

module.exports.deleteAllAdmins = function*(){
	return yield VaccinationCenterAdmins.remove({});

};










