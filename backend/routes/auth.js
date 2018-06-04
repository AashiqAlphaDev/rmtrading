var authService = require("../services/authService")
var Router = require("express").Router
var router = Router();


router.post("/register", function(req, res, next){
    authService.registerUser(req.body.username, req.body.password, function (user) {
        res.send(user);
    });
});

router.get("/users", function(req, res, next){
    authService.allUsers(function (users) {
        res.send(users);
    });
});

module.exports = router






