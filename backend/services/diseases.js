const Disease = mongoose.model('Disease');


module.exports.createDisease = function*(diseaseData){
	return yield Disease.create(diseaseData);
};

module.exports.updateDisease = function*(id, diseaseData){
	return yield Disease.update({_id:id},diseaseData);
};

module.exports.deleteDisease = function*(diseaseId){
	return yield Disease.remove({_id:diseaseId});
};

module.exports.diseases = function*(query){
	return yield Disease.find(query).exec();
}

module.exports.diseaseWithId = function*(diseaseId){
	return yield Disease.findOne({_id:diseaseId}).exec();
}

module.exports.diseaseWithName = function*(name){
	return yield Disease.findOne({name:name}).exec();
}