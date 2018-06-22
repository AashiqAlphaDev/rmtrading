const mongoose = require("mongoose")
const Pet = mongoose.model('Pet');
const PetType = mongoose.model('PetType');
const Vaccine = mongoose.model('Vaccine');
const Vaccination = mongoose.model('Vaccination');
const _ = require('underscore');

Date.prototype.addDays = function (days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
}

module.exports.createPet = function* (petData) {
	validate(petData, ["name", "pet_type", "owner", "date_of_birth"], "You missed <%=param%>.");

	let vaccines = yield Vaccine.find({pet_type: petData.pet_type}).lean().exec();
	petData.date_of_birth = new Date(petData.date_of_birth);
	let petType = yield PetType.findOne({_id: petData.pet_type}).exec();
	var petBreed = null;
	if (petData.breed) {
		petBreed = yield PetType.findOne({_id: petData.pet_type}).exec();
	}
	let life_span = petBreed ? petBreed.life_span : petType.life_span;
	let pet = yield Pet.create(petData);
	let vaccinations = [];
	for (var vaccine_index in vaccines) {
		let vaccine = vaccines[vaccine_index];
		let lastVaccination = null;
		let lastVaccinationWeek = null;
		for (var index in vaccine.child_vaccine_schedules) {
			let schedule = vaccine.child_vaccine_schedules[index];
			if (!schedule.interval) {
				if (schedule.period) {
					var dobClone = new Date(pet.date_of_birth);
					var numberOfDaysToAdd = schedule.period.start * 7;
					dobClone = dobClone.addDays(numberOfDaysToAdd);
					var start = new Date();
					var dueDate = new Date();
					start = start.addDays(-schedule.catch_up_period.notify_period * 7);
					dueDate = dueDate.addDays(schedule.catch_up_period.due_period * 7);
					lastVaccination = {
						pet: pet._id, vaccine: vaccine._id, catch_up_period: {
							start: start,
							due_date: dueDate,
						}
					};
					lastVaccinationWeek = schedule.period.start + schedule.catch_up_period.due_period;
					vaccinations.push(lastVaccination);
				}
			}
			else {
				if (schedule.period) {
					for (var i = schedule.period.start; i <= schedule.period.end; i = i + schedule.interval) {
						var dobClone = new Date(pet.date_of_birth);
						var numberOfDaysToAdd = i * 7;
						dobClone = dobClone.addDays(numberOfDaysToAdd);
						var start = new Date();
						var dueDate = new Date();
						start = start.addDays(-schedule.catch_up_period.notify_period * 7);
						dueDate = dueDate.addDays(schedule.catch_up_period.due_period * 7);
						lastVaccination = {
							pet: pet._id, vaccine: vaccine._id, catch_up_period: {
								start: start,
								due_date: dueDate,
							}
						};
						lastVaccinationWeek = i + schedule.catch_up_period.due_period;
						vaccinations.push(lastVaccination);
					}
				}
			}
		}
		for (var index in vaccine.adult_vaccine_schedules) {
			let schedule = vaccine.adult_vaccine_schedules[index];
			if (!schedule.interval) {
				if (schedule.period) {
					var dobClone = new Date(pet.date_of_birth);
					var numberOfDaysToAdd = schedule.period.start * 7;
					dobClone = dobClone.addDays(numberOfDaysToAdd);
					var start = new Date();
					var dueDate = new Date();
					start = start.addDays(-schedule.catch_up_period.notify_period * 7);
					dueDate = dueDate.addDays(schedule.catch_up_period.due_period * 7);
					lastVaccination = {
						pet: pet._id, vaccine: vaccine._id, catch_up_period: {
							start: start,
							due_date: dueDate,
						}
					};
					lastVaccinationWeek = schedule.period.start + schedule.catch_up_period.due_period;
					vaccinations.push(lastVaccination);
				}
			}
			else {
				if (schedule.period) {
					for (var i = schedule.period.start; i <= schedule.period.end; i = i + schedule.interval) {
						var dobClone = new Date(pet.date_of_birth);
						var numberOfDaysToAdd = i * 7;
						dobClone = dobClone.addDays(numberOfDaysToAdd);
						var start = new Date();
						var dueDate = new Date();
						start = start.addDays(-schedule.catch_up_period.notify_period * 7);
						dueDate = dueDate.addDays(schedule.catch_up_period.due_period * 7);
						lastVaccination = {
							pet: pet._id, vaccine: vaccine._id, catch_up_period: {
								start: start,
								due_date: dueDate,
							}
						};
						lastVaccinationWeek = i + schedule.catch_up_period.due_period;
						vaccinations.push(lastVaccination);
					}
				}
			}
		}
		for (var index in vaccine.booster_vaccine_schedules) {
			let schedule = vaccine.booster_vaccine_schedules[index];
			if (!schedule.interval) {
				if (schedule.period) {
					var dobClone = new Date(pet.date_of_birth);
					var numberOfDaysToAdd = schedule.period.start * 7;
					dobClone = dobClone.addDays(numberOfDaysToAdd);
					var start = new Date();
					var dueDate = new Date();
					start = start.addDays(-schedule.catch_up_period.notify_period * 7);
					dueDate = dueDate.addDays(schedule.catch_up_period.due_period * 7);
					lastVaccination = {
						pet: pet._id, vaccine: vaccine._id, catch_up_period: {
							start: start,
							due_date: dueDate,
						}
					};
					lastVaccinationWeek = schedule.period.start + schedule.catch_up_period.due_period;
					vaccinations.push(lastVaccination);
				}
			}
			else {
				if (schedule.period) {
					for (var i = schedule.period.start; i <= schedule.period.end; i = i + schedule.interval) {
						var dobClone = new Date(pet.date_of_birth);
						var numberOfDaysToAdd = i * 7;
						dobClone = dobClone.addDays(numberOfDaysToAdd);
						var start = new Date();
						var dueDate = new Date();
						start = start.addDays(-schedule.catch_up_period.notify_period * 7);
						dueDate = dueDate.addDays(schedule.catch_up_period.due_period * 7);
						lastVaccination = {
							pet: pet._id, vaccine: vaccine._id, catch_up_period: {
								start: start,
								due_date: dueDate,
							}
						};
						lastVaccinationWeek = i + schedule.catch_up_period.due_period;
						vaccinations.push(lastVaccination);
					}
				}
				else {
					for (var i = lastVaccinationWeek; i <= life_span; i = i + schedule.interval) {
						var dobClone = new Date(pet.date_of_birth);
						var numberOfDaysToAdd = i * 7;
						dobClone = dobClone.addDays(numberOfDaysToAdd);
						var start = new Date();
						var dueDate = new Date();
						start = dobClone.addDays(-schedule.catch_up_period.notify_period * 7);
						dueDate = dobClone.addDays(schedule.catch_up_period.due_period * 7);
						lastVaccination = {
							pet: pet._id, vaccine: vaccine._id, catch_up_period: {
								start: start,
								due_date: dueDate,
							}
						};
						lastVaccinationWeek = i + schedule.catch_up_period.due_period;
						vaccinations.push(lastVaccination);
					}
				}
			}
		}
	}
	yield Vaccination.create(vaccinations);
	return pet;
};

module.exports.updatePet = function* (id, petData) {
	queryValidate(id, "You missed pet-id.");
	return yield Pet.update({_id: id}, petData);
};

module.exports.deletePet = function* (petId) {
	queryValidate(id, "You missed pet-id.");
	return yield Pet.remove({_id: petId});
};

module.exports.pets = function* (query = {}, page) {
	return yield Pet.paginate(query, page);
};

module.exports.petWithId = function* (petId) {
	queryValidate(petId, "You missed pet-id.");
	return yield Pet.findOne({_id: petId}).exec();
};

module.exports.petsOfOwner = function* (ownerId) {
	queryValidate(ownerId, "You missed owner-id.");
	return yield Pet.find({owner: ownerId}).exec();
};

module.exports.petWithName = function* (name) {
	queryValidate(name, "You missed pet-name.");
	return yield Pet.findOne({name: name}).exec();
};

module.exports.deleteAll = function* () {
	return yield Pet.remove({});
};





