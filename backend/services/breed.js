const mongoose = require("mongoose");

const breed = mongoose.model("Breed");




module.exports.createBreed = function(breedData,callback){
    var createPromise = breed.create(breedData);
    createPromise.then(function (breeds) {
        callback(null,breeds)
    });
}


module.exports.allBreeds= function(callback){
    var promise = breed.find().exec();
    promise.then(function (breeds) {
        callback(null, breeds)
    });
    promise.catch(function (err) {
        callback(err);
    })
}


module.exports.breedWithId = function(id, callback){
    var promise = breed.findById(id).exec();
    promise.then(function (breeds) {
        callback(null, breeds);
    })
    promise.catch(function (err) {
        callback(err);
    })
}

module.exports.updateBreed = function(id, data, callback){
    var update = breed.update({_id:id}, data);
    update.then(function () {
        callback(null, true);
    })
    update.catch(function(err){
        callback(err)
    })
}

module.exports.deleteBreed = function(id, callback){
    var promise = breed.remove({_id:id});
    promise.then(function () {
        callback(null, true);
    })
    promise.catch(function(err){
        callback(err)
    })
}

