const mongoose = require("mongoose");

const request = mongoose.model("Request");



module.exports.createRequest= function(requestData,callback){
    var createPromise = request.create(requestData);
    createPromise.then(function (request) {
        callback(null,request)
    });
}


module.exports.requests= function(callback){
    var promise = request.find().exec();
    promise.then(function (request) {
        callback(null, request)
    });
    promise.catch(function (err) {
        callback(err);
    })
}


module.exports.requestWithId = function(id, callback){
    var promise = request.findById(id).exec();
    promise.then(function (request) {
        callback(null, request);
    })
    promise.catch(function (err) {
        callback(err);
    })
}

module.exports.updateRequest = function(id, data, callback){
    var update = request.update({_id:id}, data);
    update.then(function () {
        callback(null, true);
    })
    update.catch(function(err){
        callback(err)
    })
}

module.exports.deleteRequest = function(id, callback){
    var promise = request.remove({_id:id});
    promise.then(function () {
        callback(null, true);
    })
    promise.catch(function(err){
        callback(err)
    })
}
