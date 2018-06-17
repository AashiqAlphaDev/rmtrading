const mongoose = require("mongoose")
const CenterType = mongoose.model('CenterType');

module.exports.createCenterType = function*(centerTypeData){
	validate(centerTypeData,["name"],"You missed <%=param%>.");
    let existingCenterType = yield CenterType.findOne({name:centerTypeData.name});
	if(existingCenterType){
		return existingCenterType;
	}
	return yield CenterType.create(centerTypeData);
};

module.exports.updateCenterType = function*(id, centerTypeData){
    queryValidate(id,"You missed centerType-id.");
	return yield CenterType.update({_id:id},centerTypeData);
};

module.exports.deleteCenterType = function*(centerTypeId){
    queryValidate(centerTypeId,"You missed centerType-id.");
    return yield CenterType.remove({_id:centerTypeId});
};

module.exports.centerTypes = function*(query={}){
	return yield CenterType.find(query).exec();
};

module.exports.centerTypeWithId = function*(centerTypeId){
    queryValidate(centerTypeId,"You missed centerType-id.");
    return yield CenterType.findOne({_id:centerTypeId}).exec();
};

module.exports.centerTypeWithName = function*(name){
    queryValidate(name,"You missed centerType-name.");

    return yield CenterType.findOne({name:name}).exec();
};

module.exports.deleteAll = function*(){
	return yield CenterType.remove({});
};






