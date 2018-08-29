var Router = require("express").Router
var router = Router();
const LinkManagementService = require("../services/link");



router.get("/", httpCoWrap(function* (req, res, next) {
	var query = req.query.query ? req.query.query : {};
	let links = yield LinkManagementService.links(query);
	res.send(links);
}));

router.get("/:user_id", httpCoWrap(function* (req, res, next) {
	let link = yield LinkManagementService.linkWithId(req.params.user_id);
	res.send(link);
}));

router.post("/", httpCoWrap(function* (req, res, next) {
	let link = yield LinkManagementService.createLink(req.body);
	res.send(link);
}));

router.put("/:user_id", httpCoWrap(function* (req, res, next) {
	let link = yield LinkManagementService.updateLink(req.params.user_id, req.body);
	res.send(link);
}));

router.delete("/:link_id", httpCoWrap(function* (req, res, next) {
    yield LinkManagementService.deleteLink(req.params.link_id);
    res.send({});
}));

module.exports = router;