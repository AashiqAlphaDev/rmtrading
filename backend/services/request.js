const mongoose = require("mongoose")
const Request = mongoose.model('Request');

module.exports.createRequest = function*(requestData){
    validate(requestData, ["title","center"], "you missed <%=param%>.");
	let existingRequest = yield Request.findOne({name:requestData.name});
	if(existingRequest){
		return existingRequest;
	}
	return yield Request.create(requestData);
};

module.exports.updateRequest = function*(id, requestData){
    queryValidate(id,"you missed request-id.");
	return yield Request.update({_id:id},requestData);
};

module.exports.deleteRequest = function*(requestId){
    queryValidate(requestId,"you missed request-id.");
	return yield Request.remove({_id:requestId});
};

module.exports.requests = function*(query={}){

	return yield Request.find(query).exec();
};

module.exports.requestWithId = function*(requestId){
    queryValidate(requestId,"you missed request-id.");
	return yield Request.findOne({_id:requestId}).exec();
};

module.exports.requestWithName = function*(name){
    queryValidate(name,"you missed request-name.");
	return yield Request.findOne({name:name}).exec();
};

module.exports.deleteAll = function*(){
	return yield Request.remove({});
};




