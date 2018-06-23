const mongoose = require("mongoose");
const Vaccination = mongoose.model('Vaccination');

module.exports.createVaccination = function* (petId, vaccinationData) {
	let existingVaccinations = yield Vaccination.findOne({name: vaccinationData.name});
	if (existingVaccinations) {
		return existingVaccinations;
	}
	return yield Vaccination.create(vaccinationData);
};

module.exports.updateVaccination = function* (petId, id, vaccinationData) {
	return yield Vaccination.update({_id: id}, vaccinationData);
};

module.exports.vaccinations = function* (petId, query = {}, page={}) {
	query.pet = petId;
	page = {...page,sort:{"catch_up_period.start":-1}};
	return yield Vaccination.paginate(query, page);
};

module.exports.vaccinationWithId = function* (vaccinationId) {
	return yield Vaccination.findOne({_id: vaccinationId}).exec();
};

module.exports.deleteAll = function* () {
	return yield Vaccination.remove({});
};
