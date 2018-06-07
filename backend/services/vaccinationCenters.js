const mongoose = require("mongoose");

const VaccineCenter = mongoose.model("VaccinationCenter");

module.exports.createVaccineCenter = function*(vaccineCenterData){
	vaccineCenterData.status = "inactive";
    return yield VaccineCenter.create(vaccineCenterData);
}

module.exports.updateVaccineCenter = function*(id,vaccineCenterData){
	return yield VaccineCenter.update({_id:id},vaccineCenterData);
}

module.exports.vaccineCenters = function*(query={}, page={}){
	return yield VaccineCenter.paginate(query, page)
}

module.exports.vaccineCentersWithId = function*(id){
    return yield VaccineCenter.findById(id).exec();
}

module.exports.deleteVaccineCenter = function*(id){
	return yield VaccineCenter.update({_id:id},{status:"deleted"});
}
