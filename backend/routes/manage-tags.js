var Router = require("express").Router
var router = Router();
const TagManagementService = require("../services/tag");



router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	let tags = yield TagManagementService.tags(query);
	res.send(tags);
}));

router.get("/:user_id", httpCoWrap(function* (req, res, next) {
	let tag = yield TagManagementService.tagWithId(req.params.user_id);
	res.send(tag);
}));

router.post("/", httpCoWrap(function* (req, res, next) {
	console.log(req.body);
	let tag = yield TagManagementService.createTag(req.body);
	res.send(tag);
}));

router.put("/:user_id", httpCoWrap(function* (req, res, next) {
	let tag = yield TagManagementService.updateTag(req.params.user_id, req.body);
	res.send(tag);
}));

router.delete("/:tag_id", httpCoWrap(function* (req, res, next) {
    yield TagManagementService.deleteTag(req.params.tag_id);
    res.send({});
}));

module.exports = router;