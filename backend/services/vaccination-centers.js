const mongoose = require("mongoose")
const VaccinationCenters = mongoose.model('VaccinationCenter');

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

module.exports.vaccinationCenterWithName = function*(name){
	return yield VaccinationCenters.findOne({name:name}).exec();
};

module.exports.deleteAll = function*(){
	return yield VaccinationCenters.remove({});
};

