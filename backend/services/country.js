const mongoose = require("mongoose")
const Country = mongoose.model('Country');
const State = mongoose.model('State');

module.exports.createCountry = function* (countryData) {
	validate(countryData, ["name"], "You missed <%=param%>.");
	let existingCountry = yield Country.findOne({name: countryData.name});
	if (existingCountry) {
		return existingCountry;
	}
	return yield Country.create(countryData);
};

module.exports.createState = function* (country_id, stateData) {
	console.log({country: country_id, ...stateData});
	return yield State.create({country: country_id, ...stateData});
};

module.exports.states = function* (country_id, query = {}) {
	query.country = country_id;
	return yield State.find(query).exec();
};

module.exports.updateCountry = function* (id, countryData) {
	queryValidate(id, "You missed country-id.");
	return yield Country.update({_id: id}, countryData);
};

module.exports.deleteCountry = function* (countryId) {
	queryValidate(countryId, "You missed country-id.");
	return yield Country.remove({_id: countryId});
};

module.exports.countries = function* (query = {}) {
	return yield Country.find(query).exec();
};

module.exports.countryWithId = function* (countryId) {
	queryValidate(id, "You missed country-id.");
	return yield Country.findOne({_id: countryId}).exec();
};

module.exports.countryWithName = function* (name) {
	queryValidate(name, "You missed country-name.");
	return yield Country.findOne({name: name}).exec();
};

module.exports.deleteAll = function* () {
	return yield Country.remove({});
};






