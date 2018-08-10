const mongoose = require("mongoose")
const Claim = mongoose.model('Claim');

module.exports.createClaim = function* (claimData) {
	return yield Claim.create(claimData);
};

module.exports.updateClaim = function* (id, claimData) {
	queryValidate(id, "You missed claim-id.");
	return yield Claim.update({_id:id},claimData);
};

module.exports.claims = function* (claimId,query = {}) {
	query.claim = claimId;
	return yield Claim.find(query).exec();
};

module.exports.claimWithId = function* (claimId) {
	queryValidate(claimId, "You missed claim-id.");
	return yield Claim.findOne({_id: claimId}).exec();
};

module.exports.deleteAll = function* (claimID) {
    return yield Claim.remove({_id: claimID});
};






