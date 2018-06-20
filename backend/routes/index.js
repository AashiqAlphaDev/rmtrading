var Router = require("express").Router
var router = Router({mergeParams: true});
const haveCenterAccess = require("./check-center-access")

router.use(require("./auth"));
router.use("/super-admin", require("./super-admin"));
router.use("/app-data/diseases",require("./manage-diseases"));
router.use("/app-data/countries",require("./manage-countries"));
router.use("/center-types",require("./manage-center-type"));
router.use("/tokens",require("./manage-tokens"));
router.use("/requests",require("./manage-requests"));
router.use("/vaccines",require("./manage-vaccines"));
router.use("/vaccination-centers",require("./manage-vaccination-centers"));
router.use("/app-data/pet-types",require("./manage-pet-types"));
router.use("/inventory",require("./manage-inventory"));
router.use("/app-data/countries",require("./manage-countries"));
router.use("/session",require("./session"));
router.use("/pets", require("./manage-pets"));
router.use("/users", require("./manage-users"));
router.use("/pets/:pet_id/vaccinations",haveCenterAccess,require("./manage-vaccinations"));

router.use("/vaccination-centers/:center_id/appointments",require("./manage-appointments"));

router.use("/dev",require("./dev"));

module.exports = router