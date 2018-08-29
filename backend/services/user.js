const mongoose = require("mongoose");
const User = mongoose.model('User');

module.exports.createUser = function* (userData) {
    return yield User.create(userData);
};

module.exports.updateUser = function* (userId, userData) {
    queryValidate(userId, "You missed user-id.");
    return yield User.update({_id: userId}, userData);
};

module.exports.userWithId = function* (userId) {
    queryValidate(userId, "You missed user-id.");
    return yield User.findOne({_id: userId});
};

module.exports.users = function* (query = {}, page) {
    return yield User.paginate(query, page);
};

