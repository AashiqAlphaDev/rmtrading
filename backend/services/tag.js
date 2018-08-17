const mongoose = require("mongoose");
const Tag = mongoose.model('Tag');
const createError = require('http-errors');





module.exports.createTag = function* (tagData) {
    let existingCollection = yield Tag.findOne({$or: [
        {profile:{mobile_number: tagData.profile.mobile_number}},
        {email:tagData.email}
    ]}).exec();
    if (existingCollection) {
        let error = createError(400);
        error.message = "Collection Already Exists";
        error.data = existingCollection;
        throw error;
    }
	tagData.email_verified = false;
	return yield Tag.create(tagData);
};

module.exports.updateTag = function* (tagId, tagData) {
	return yield Tag.update({_id: tagId}, tagData);
};

module.exports.TagWithId = function* (tagId) {
	return yield Tag.findOne({_id: tagId});
};

module.exports.Tags = function* (query = {}, page) {
	return yield Tag.paginate(query, page);
};





