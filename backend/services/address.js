const mongoose = require("mongoose");

const address = mongoose.model("Country");


module.exports.createAddress = function(addressData,callback){
    var createPromise = address.create(addressData);
    createPromise.then(function (address) {
        callback(null,address)
    });
}

module.exports.allAddresses= function(callback){
    var promise = address.find().exec();
    promise.then(function (address) {
        callback(null, address)
    });
    promise.catch(function (err) {
        callback(err);
    });
}


module.exports.addressWithId = function(id, callback){
    var promise = address.findById(id).exec();
    promise.then(function (address) {
        callback(null, address);
    })
    promise.catch(function (err) {
        callback(err);
    })
}

module.exports.updateAddress = function(id, data, callback){
    var update = address.update({_id:id}, data);
    update.then(function () {
        callback(null, true);
    })
    update.catch(function(err){
        callback(err)
    })
}

module.exports.deleteAddress = function(id, callback){
    var promise = address.remove({_id:id});
    promise.then(function () {
        callback(null, true);
    })
    promise.catch(function(err){
        callback(err)
    })
}


