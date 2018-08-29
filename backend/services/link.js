const mongoose = require("mongoose");
const Link = mongoose.model('Link');

const urlMetadata = require('url-metadata')






module.exports.createLink = function* (linkData) {
    urlMetadata('https://www.facebook.co.in').then(
        function (metadata) { // success handler
            console.log(metadata)
        },
        function (error) { // failure handler
            console.log(error)
        })
    console.log(linkData);
    return yield Link.create(linkData);
};
module.exports.updateLink = function* (linkId, linkData) {
    return yield Link.update({_id: linkId}, linkData);
};
module.exports.linkWithId = function* (linkId) {
    return yield Link.findOne({_id: linkId});
};
module.exports.links = function* (query = {}, page) {
    return yield Link.paginate(query, page);
};
module.exports.deleteLink = function* (linkId) {

    return yield Link.remove({_id: linkId});
};















