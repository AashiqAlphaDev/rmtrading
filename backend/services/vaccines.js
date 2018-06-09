const mongoose = require("mongoose")
const Vaccines = mongoose.model('Vaccine');

module.exports.createVaccine = function*(vaccineData){
	let existingVaccines = yield Vaccines.findOne({name:vaccineData.name});
	if(existingVaccines){
		return existingVaccines;
	}
	return yield Vaccines.create(vaccineData);
};

module.exports.updateVaccine = function*(id, vaccineData){
	return yield Vaccines.update({_id:id},vaccineData);
};

module.exports.deleteVaccine = function*(vaccineId){
	return yield Vaccines.remove({_id:vaccineId});
};

module.exports.vaccines = function*(query={}){
	return yield Vaccines.find(query).exec();
};

module.exports.vaccineWithId = function*(vaccineId){
	return yield Vaccines.findOne({_id:vaccineId}).exec();
};

module.exports.vaccineWithName = function*(name){
	return yield Vaccines.findOne({name:name}).exec();
};

module.exports.deleteAll = function*(){
	return yield Vaccines.remove({});
};

