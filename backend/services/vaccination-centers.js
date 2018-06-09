const mongoose = require("mongoose")
const VaccinationCenters = mongoose.model('VaccinationCenter');
const VaccinationCenterAdmins = mongoose.model('VaccinationCenterAdmin');

module.exports.createVaccinationCenter = function*(vaccinationCenterData){
	return yield VaccinationCenters.create(vaccinationCenterData);
};

module.exports.updateVaccinationCenter = function*(id, vaccinationCenterData){
	return yield VaccinationCenters.update({_id:id},vaccinationCenterData);
};

module.exports.deleteVaccinationCenter = function*(vaccinationCenterId){
	return yield VaccinationCenters.remove({_id:vaccinationCenterId});
};

module.exports.vaccinationCenters = function*(query={}){
	return yield VaccinationCenters.find(query).exec();
};

module.exports.vaccinationCenterWithId = function*(vaccinationCenterId){
	return yield VaccinationCenters.findOne({_id:vaccinationCenterId}).exec();
};

module.exports.deleteAll = function*(){
	return yield VaccinationCenters.remove({});
};


module.exports.admins = function*(centerId){
	return yield VaccinationCenterAdmins.find({vaccination_center:centerId});
}

module.exports.createAdmin = function*(centerId,adminData){
	let existingBreed = yield VaccinationCenterAdmins.findOne({vaccination_center:centerId, email:adminData.email});
	if(existingBreed){
		return existingBreed;
	}
	adminData.vaccination_center = centerId;
	return yield VaccinationCenterAdmins.create(adminData);
};

module.exports.deleteAdmin = function*(adminId){
	return yield VaccinationCenterAdmins.remove({_id:adminId});
};

module.exports.deleteAllAdmins = function*(){
	return yield VaccinationCenterAdmins.remove({});
};


