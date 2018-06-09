var Router = require("express").Router
var router = Router();
const haveCenterAccess = require("./check-center-access")

router.use(require("./auth"));
router.use("/super-admin", require("./super-admin"));
router.use("/diseases",require("./manage-diseases"));
router.use("/vaccines",require("./manage-vaccines"));
router.use("/vaccination-centers",require("./manage-vaccination-centers"));
router.use("/pet-types",require("./manage-pet-types"));
router.use("/inventory",require("./manage-inventory"));
router.use("/session",require("./session"));
router.use("/pets",haveCenterAccess,require("./manage-pets"));

router.use("/dev",require("./dev"));

module.exports = router