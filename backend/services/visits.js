const mongoose = require("mongoose")
const Visit = mongoose.model('Visit');

module.exports.createVisit = function* (petId,visitData) {
	visitData.pet = petId;
	return yield Visit.create(visitData);
};

module.exports.updateVisit = function* (id, visitData) {
	queryValidate(id, "You missed visit-id.");
	return yield Visit.update({_id: id}, visitData);
};

module.exports.visits = function* (petId,query = {}) {
	query.pet = petId;
	return yield Visit.find(query).exec();
};

module.exports.visitWithId = function* (visitId) {
	queryValidate(id, "You missed visit-id.");
	return yield Visit.findOne({_id: visitId}).exec();
};

module.exports.deleteAll = function* () {
	return yield Visit.remove({});
};






