var Router = require("express").Router
var router = Router();
var authService = require("../services/authService")
router.use(require("./mailer"));


router.use("/super-admin", require("./super-admin"));
router.use("/diseases",require("./manage-diseases"));
router.use("/vaccines",require("./manage-vaccines"));
router.use("/vaccination-centers",require("./manage-vaccination-centers"));
router.use("/pet-types",require("./manage-pet-types"));

router.use("/dev",require("./dev"));

//router.use(require("./address"))
//router.use(require("./auth"))
//router.use(require("./pets"))
//router.use(require("./vaccines"))
//router.use(require("./vaccinesCenter"))
module.exports = router