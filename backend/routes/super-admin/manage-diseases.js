var Router = require("express").Router
var router = Router();
const co = require("co");

router.get("/diseases", co.wrap(function*(req, res, next){

}));

router.get("/diseases/:disease_id", co.wrap(function*(req, res, next){

}));

router.post("/diseases", co.wrap(function*(req, res, next){

}));

router.put("/diseases/:disease_id", co.wrap(function*(req, res, next){

}));

router.delete("/diseases/:disease_id", co.wrap(function*(req, res, next){

}));


module.exports = router;