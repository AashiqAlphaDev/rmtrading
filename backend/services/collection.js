const mongoose = require("mongoose");
const Collection = mongoose.model('Collection');
const createError = require('http-errors');





module.exports.createCollection = function* (collectionData) {
    let existingCollection = yield Collection.findOne({$or: [
        {profile:{mobile_number: collectionData.profile.mobile_number}},
        {email:collectionData.email}
    ]}).exec();
    if (existingCollection) {
        let error = createError(400);
        error.message = "Collection Already Exists";
        error.data = existingCollection;
        throw error;
    }
	collectionData.email_verified = false;
	return yield Collection.create(collectionData);
};

module.exports.updateCollection = function* (collectionId, collectionData) {
	return yield Collection.update({_id: collectionId}, collectionData);
};

module.exports.collectionWithId = function* (collectionId) {
	return yield Collection.findOne({_id: collectionId});
};

module.exports.collections = function* (query = {}, page) {
	return yield Collection.paginate(query, page);
};





