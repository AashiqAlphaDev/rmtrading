const mongoose = require("mongoose")
const Token = mongoose.model('Token');
const _  = require("underscore");

module.exports.generateTokens = function* (count) {
	return yield Token.create(_.map(_.range(1,count), ()=>{
		return {status:"not-assigned"};
	}));
}

module.exports.createToken = function* (tokenData) {
	validate(tokenData, ["pet"], "You missed <%=param%>.");
	let existingToken = yield Token.findOne({name: tokenData.name});
	if (existingToken) {
		return existingToken;
	}
	return yield Token.create(tokenData);
};

module.exports.updateToken = function* (id, tokenData) {
	queryValidate(id, "You missed token-id.");
	let token = yield Token.findOne({_id: id});
	return yield Token.update({_id: id}, tokenData);
};

module.exports.deleteToken = function* (tokenId) {
	queryValidate(tokenId, "You missed token-id.");
	return yield Token.remove({_id: tokenId});
};

module.exports.tokens = function* (query = {}) {
	return yield Token.find(query).exec();
};

module.exports.tokenWithId = function* (tokenId) {
	queryValidate(tokenId, "You missed token-id.");
	return yield Token.findOne({_id: tokenId}).exec();
};

module.exports.tokenWithName = function* (name) {
	queryValidate(name, "You missed token-name.");
	return yield Token.findOne({name: name}).exec();
};

module.exports.deleteAll = function* () {
	return yield Token.remove({});
};







