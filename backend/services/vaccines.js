const mongoose = require("mongoose");
const vaccines = mongoose.model("Vaccine");




module.exports.createVaccine= function(vaccineData,callback){
    var createPromise = vaccines.create(vaccineData);
    createPromise.then(function (vaccines) {
        callback(null,vaccines)
    });
}


module.exports.vaccines= function(query={}, page,callback){
    var promise = vaccines.find(query).exec();
    promise.then(function (vaccines) {
        callback(null, vaccines)
    });
    promise.catch(function (err) {
        callback(err);
    })
}


module.exports.vaccineWithId = function(id, callback){
    var promise = vaccines.findById(id).exec();
    promise.then(function (vaccine) {
        callback(null, vaccine);
    })
    promise.catch(function (err) {
        callback(err);
    })
}

module.exports.updateVaccine = function(id, data, callback){
    var update = vaccines.update({_id:id}, data);
    update.then(function () {
        callback(null, true);
    })
    update.catch(function(err){
        callback(err)
    })
}

module.exports.deleteVaccine = function(id, callback){
    var promise = vaccines.remove({_id:id});
    promise.then(function () {
        callback(null, true);
    })
    promise.catch(function(err){
        callback(err)
    })
}


module.exports.addSchedule = function (id, schedule, callback) {

    var update = vaccines.update({_id:id}, schedule);
    update.then(function () {
        callback(null, true);
    })
    update.catch(function(err){
        callback(err)
    })


}

module.exports.removeSchedule = function (id, scheduleId, callback) {
    var vaccine = vaccines.findOne({_id:id}).exec();
    vaccine.remove({_id:scheduleId});
    vaccine.then(function () {
        callback(null, true);
    })
    vaccine.catch(function(err){
        callback(err)
    })
}



