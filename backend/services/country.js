const mongoose = require("mongoose")
const Country = mongoose.model('Country');

module.exports.createCountry = function*(countryData){
	validate(countryData,["name"],"You missed <%=param%>.");
    let existingCountry = yield Country.findOne({name:countryData.name});
	if(existingCountry){
		return existingCountry;
	}
	return yield Country.create(countryData);
};

module.exports.updateCountry = function*(id, countryData){
    queryValidate(id,"You missed country-id.");
	return yield Country.update({_id:id},countryData);
};

module.exports.deleteCountry = function*(countryId){
    queryValidate(countryId,"You missed country-id.");
    return yield Country.remove({_id:countryId});
};

module.exports.countries = function*(query={}){
	return yield Country.find(query).exec();
};

module.exports.countryWithId = function*(countryId){
    console.log(countryId);
    queryValidate(countryId,"You missed country-id.");
    return yield Country.findOne({_id:countryId}).exec();
};

module.exports.deleteAll = function*(){
	return yield Country.remove({});
};






