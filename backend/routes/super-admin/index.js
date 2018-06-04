var Router = require("express").Router
var router = Router();

router.use(require("./auth"));

module.exports = router;