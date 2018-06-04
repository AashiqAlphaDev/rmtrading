const mongoose = require("mongoose");

const vaccineCenters = mongoose.model("VaccinationCenter");




module.exports.createVaccineCenters= function(vaccineCenterData,callback){
    var createPromise = vaccineCenters.create(vaccineCenterData);
    createPromise.then(function (vaccineCenter) {
        callback(null,vaccineCenter)
    });
}


module.exports.vaccineCenters = function(query, page, callback){
    var promise = vaccineCenters.find().exec();
    promise.then(function (vaccineCenter) {
        callback(null, vaccineCenter)
    });
    promise.catch(function (err) {
        callback(err);
    })
}


module.exports.vaccineCentersWithId = function(id, callback){
    var promise = vaccineCenters.findById(id).exec();
    promise.then(function (vaccineCenter) {
        callback(null, vaccineCenter);
    })
    promise.catch(function (err) {
        callback(err);
    })
}

module.exports.updateVaccineCenter = function(id, data, callback){
    var update = vaccineCenters.update({_id:id}, data);
    update.then(function () {
        callback(null, true);
    })
    update.catch(function(err){
        callback(err)
    })
}

module.exports.deleteVaccineCenter = function(id, callback){
    var promise = vaccineCenters.remove({_id:id});
    promise.then(function () {
        callback(null, true);
    })
    promise.catch(function(err){
        callback(err)
    })
}
