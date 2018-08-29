const mongoose = require("mongoose");
const Category = mongoose.model('Category');

module.exports.createCategory = function* (categoryData) {

    return yield Category.create(categoryData);
};
module.exports.updateCategory = function* (categoryId, categoryData) {
    return yield Category.update({_id: categoryId}, categoryData);
};
module.exports.categoryWithId = function* (categoryId) {
    return yield Category.findOne({_id: categoryId});
};
module.exports.categories = function* (query = {}, page) {
    return yield Category.paginate(query, page);
};
module.exports.deleteCategory = function* (categoryId) {

    return yield Category.remove({_id: categoryId});
};















