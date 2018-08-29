const mongoose = require("mongoose");
const Tag = mongoose.model('Tag');

module.exports.createTag = function* (tagData) {

    return yield Tag.create(tagData);
};
module.exports.updateTag = function* (tagId, tagData) {
    return yield Tag.update({_id: tagId}, tagData);
};
module.exports.tagWithId = function* (tagId) {
    return yield Tag.findOne({_id: tagId});
};
module.exports.tags = function* (query = {}, page) {
    return yield Tag.paginate(query, page);
};
module.exports.deleteTag = function* (tagId) {

    return yield Tag.remove({_id: tagId});
};















