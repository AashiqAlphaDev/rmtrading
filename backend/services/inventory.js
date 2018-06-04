const mongoose = require("mongoose");


const inventory = mongoose.model("Inventory");



module.exports.createInventory= function(inventoryData,callback){
    var createPromise = inventory.create(inventoryData);
    createPromise.then(function (inventory) {
        callback(null,inventory)
    });
}


module.exports.inventories= function(callback){
    var promise = inventory.find().exec();
    promise.then(function (inventory) {
        callback(null, inventory)
    });
    promise.catch(function (err) {
        callback(err);
    })
}


module.exports.inventoryWithId = function(id, callback){
    var promise = inventory.findById(id).exec();
    promise.then(function (inventory) {
        callback(null, inventory);
    })
    promise.catch(function (err) {
        callback(err);
    })
}

module.exports.updateInventory = function(id, data, callback){
    var update = inventory.update({_id:id}, data);
    update.then(function () {
        callback(null, true);
    })
    update.catch(function(err){
        callback(err)
    })
}

module.exports.deleteInventory = function(id, callback){
    var promise = inventory.remove({_id:id});
    promise.then(function () {
        callback(null, true);
    })
    promise.catch(function(err){
        callback(err)
    })
}