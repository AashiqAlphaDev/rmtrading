var Router = require("express").Router
var router = Router();
const isAdmin = require("./check-admin")

router.use(require("./auth"));
router.use("/vaccination-centers",isAdmin,require("./manage-vaccination-centers"));
router.use("/diseases",require("./manage-diseases"));
router.use("/pets",require("./manage-pets"));

module.exports = router;