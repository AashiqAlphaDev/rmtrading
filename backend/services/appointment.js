const mongoose = require("mongoose")
const Disease = mongoose.model('Disease');

module.exports.createDisease = function*(diseaseData){
	let existingDisease = yield Disease.findOne({name:diseaseData.name});
	if(existingDisease){
		return existingDisease;
	}
	return yield Disease.create(diseaseData);
};

module.exports.updateDisease = function*(id, diseaseData){
	return yield Disease.update({_id:id},diseaseData);
};

module.exports.deleteDisease = function*(diseaseId){
	return yield Disease.remove({_id:diseaseId});
};

module.exports.diseases = function*(query={}){
	return yield Disease.find(query).exec();
};

module.exports.diseaseWithId = function*(diseaseId){
	return yield Disease.findOne({_id:diseaseId}).exec();
};

module.exports.diseaseWithName = function*(name){
	return yield Disease.findOne({name:name}).exec();
};

module.exports.deleteAll = function*(){
	return yield Disease.remove({});
};

