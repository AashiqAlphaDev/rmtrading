var Router = require("express").Router
var router = Router({mergeParams: true});

router.use("/users", require("./manage-users"));
router.use("/tags", require("./manage-tags"));
router.use("/categories", require("./manage-categories"));
router.use("/links", require("./manage-links"));

module.exports = router