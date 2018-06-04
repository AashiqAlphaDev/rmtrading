const mongoose = require("mongoose");
const pets = mongoose.model("Pet");

module.exports.createPet= function(petData,callback){
    var createPromise = pets.create(petData);
    createPromise.then(function (pet) {
        callback(null,pet)
    });
}


module.exports.pets = function(query, page,callback){
    var promise = pets.find().exec();
    promise.then(function (pet) {
        callback(null, pet)
    });
    promise.catch(function (err) {
        callback(err);
    })
}


module.exports.petWithId = function(id, callback){
    var promise = pets.findById(id).exec();
    promise.then(function (pet) {
        callback(null, pet);
    })
    promise.catch(function (err) {
        callback(err);
    })
}

module.exports.updatePet = function(id, data, callback){
    var update = pets.update({_id:id}, data);
    update.then(function () {
        callback(null, true);
    })
    update.catch(function(err){
        callback(err)
    })
}

module.exports.deletePet = function(id, callback){
    var promise = pets.remove({_id:id});
    promise.then(function () {
        callback(null, true);
    })
    promise.catch(function(err){
        callback(err)
    })
}
