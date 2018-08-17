const mongoose = require("mongoose");
const Link = mongoose.model('Link');
const createError = require('http-errors');





module.exports.createLink = function* (linkData) {
    let existingCollection = yield Link.findOne({$or: [
        {profile:{mobile_number: linkData.profile.mobile_number}},
        {email:linkData.email}
    ]}).exec();
    if (existingCollection) {
        let error = createError(400);
        error.message = "Collection Already Exists";
        error.data = existingCollection;
        throw error;
    }
	linkData.email_verified = false;
	return yield Link.create(linkData);
};

module.exports.updateLink = function* (linkId, linkData) {
	return yield Link.update({_id: linkId}, linkData);
};

module.exports.LinkWithId = function* (linkId) {
	return yield Link.findOne({_id: linkId});
};

module.exports.Links = function* (query = {}, page) {
	return yield Link.paginate(query, page);
};





