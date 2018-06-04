var Router = require("express").Router;
var router = Router();
var address = require("../services/address")

router.get("/countries", function (req, res, next) {
    address.allAddresses(function (country) {
        res.send(country);
    });
})

router.get("/countries/:country_id", function (req, res, next) {
    address.addressWithId(req.query.id,function (country) {
        res.send(country);
    });
});

router.post("/countries", function (req, res, next) {
    address.createAddress(req.body, function (country) {
        res.send(country);
    });
});

router.put("/countries/:country_id", function (req, res, next) {
    address.updateAddress(req.body.name, req.body.states, function (country) {
        res.send(country);
    });
});

router.delete("/countries/:country_id", function (req, res, next) {
    address.deleteAddress(req.body.name, req.body.states, function (user) {
        res.send(user);
    });
});

module.exports = router
