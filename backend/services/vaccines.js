const mongoose = require("mongoose")
const Vaccines = mongoose.model('Vaccine');

module.exports.createVaccine = function*(vaccineData){
    validate(vaccineData, ["name","pet_type","country","disease"], "You missed <%=param%>.");
	let existingVaccines = yield Vaccines.findOne({name:vaccineData.name});
	if(existingVaccines){
		return existingVaccines;
	}
	return yield Vaccines.create(vaccineData);
};

module.exports.updateVaccine = function*(id, vaccineData){
    queryValidate(id,"You missed vaccine-id.");
	return yield Vaccines.update({_id:id},vaccineData);
};

module.exports.deleteVaccine = function*(vaccineId){
    queryValidate(vaccineId,"You missed vaccine-id.");
	return yield Vaccines.remove({_id:vaccineId});
};

module.exports.vaccines = function*(query={}, page){
	return yield Vaccines.paginate(query, page);
};

module.exports.vaccineWithId = function*(vaccineId){
    queryValidate(vaccineId,"You missed vaccine-id.");
	return yield Vaccines.findOne({_id:vaccineId}).exec();
};

module.exports.vaccineWithName = function*(name){
    queryValidate(name,"You missed vaccine-name.");
	return yield Vaccines.findOne({name:name}).exec();
};

module.exports.deleteAll = function*(){
	return yield Vaccines.remove({});
};









