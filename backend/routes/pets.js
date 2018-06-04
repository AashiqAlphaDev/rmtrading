var Router = require("express").Router
var router = Router();

var pet = require("../services/pet")
var breed = require("../services/breed")
var user_pet = require("../services/user_pet")


router.get("pet-kind", function (req, res, next) {
    pet.petsTypes(function (pet_kind) {
        res.send(pet_kind);
    });
});


router.get("/pet-kind/:id",function(req,res,next){
    pet.createPetType(req.query.id,function (user) {
        res.send(user);
    });

});

router.put("/pet-kind/:id", function(req,res,next){
    pet.updatePetType(req.query.id,req.body.name, req.body.states, function (user) {
        res.send(user);
    });
});

router.post("/pet-kind", function(req,res,next){
    pet.createPetType(req.body.name, req.body.states, function (user) {
        res.send(user);
    });
});
router.delete("/pet-kind/:id", function(req,res,next){
    pet.deletePetType(req.query.id, function (user) {
        res.send(user);
    });
});

router.get("/breed-types", function(req,res,next){
    breed.allBreeds( function (user) {
        res.send(user);
    });
})

router.get("/breed-types/:id", function(req,res,next){
    breed.breedWithId( function (user) {
        res.send(user);
    });
})

router.put("/breed-types/:id", function(req,res,next){
    breed.breedWithId(req.body.name, req.body.years,req.body.months, function (user) {
        res.send(user);
    });
})

router.post("/breed-types", function(req,res,next){
    breed.createBreed(req.body.name, req.body.years,req.body.months, function (user) {
        res.send(user);
    });
})

router.delete("/breed-types/:id", function(req,res,next){
    breed.deleteBreed(req.body.name, req.body.years,req.body.months, function (user) {
        res.send(user);
    });
})

router.get("/pets", function(req,res,next){
    user_pet.pets(function (user) {
        res.send(user);
    });

})

router.get("/pets/:id",function(req,res,next){
    user_pet.petWithId(function (user) {
        res.send(user);
    });
})
router.put("/pets/:id",function(req,res,next){
    user_pet.updatePet(req.body.name, req.body.pet_type,req.body.breed,req.body.owner, function (user) {
        res.send(user);
    });
})
router.post("/pets",function(req,res,next){
    user_pet.createPet(req.body.name, req.body.pet_type,req.body.breed,req.body.owner, function (user) {
        res.send(user);
    });
})
router.delete("/pets/:id",function(req,res,next){
    user_pet.deletePet(req.body.name, req.body.pet_type,req.body.breed,req.body.owner, function (user) {
        res.send(user);
    });
})



module.exports = router;





