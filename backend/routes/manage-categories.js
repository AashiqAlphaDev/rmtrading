var Router = require("express").Router
var router = Router();
const CategoryManagementService = require("../services/category");



router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	let categories = yield CategoryManagementService.categories(query);
	res.send(categories);
}));

router.get("/:user_id", httpCoWrap(function* (req, res, next) {
	let category = yield CategoryManagementService.categoryWithId(req.params.user_id);
	res.send(category);
}));

router.post("/", httpCoWrap(function* (req, res, next) {
	console.log(req.body);
	let category = yield CategoryManagementService.createCategory(req.body);
	res.send(category);
}));

router.put("/:user_id", httpCoWrap(function* (req, res, next) {
	let category = yield CategoryManagementService.updateCategory(req.params.user_id, req.body);
	res.send(category);
}));

router.delete("/:category_id", httpCoWrap(function* (req, res, next) {
    yield CategoryManagementService.deleteCategory(req.params.category_id);
    res.send({});
}));

module.exports = router;