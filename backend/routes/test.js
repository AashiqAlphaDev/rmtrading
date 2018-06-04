var Router = require("express").Router
var router = Router();




//Admin

//Super Admin


// Manage Breeds
// POST BreedType
// GET BreedTypes
// GET BreedType
// PUT BreedType
// DELETE BreedType




// Manage Vaccines
// Create Vaccine
// Update Vaccine
// Bulk Update Vaccines
// Manage Vaccine Schedules
// Add Vaccine Schedule
// Delete Vaccine Schedules




// Manage Vaccination Centers
// Add Vaccination Center
// Add Admin to vaccination center
// Delete Admin from vaccination center




// request


// Inventory





// Notification
// module.exports.createNotification= function({name,description,scientific_name},callback){
//     var createPromise = notification.create({name:name,description:description,scientific_name:scientific_name});
//     createPromise.then(function (notification) {
//         callback(null,notification)
//     });
// }
//
//
// module.exports.allNotification= function(callback){
//     var promise = notification.find().exec();
//     promise.then(function (notification) {
//         callback(null, notification)
//     });
//     promise.catch(function (err) {
//         callback(err);
//     })
// }
//
//
// module.exports.NotificationWithId = function(id, callback){
//     var promise = notification.findById(id).exec();
//     promise.then(function (notification) {
//         callback(null, notification);
//     })
//     promise.catch(function (err) {
//         callback(err);
//     })
// }
//
// module.exports.updateNotification = function(id, data, callback){
//     var update = notification.update({_id:id}, data);
//     update.then(function () {
//         callback(null, true);
//     })
//     update.catch(function(err){
//         callback(err)
//     })
// }
//
// module.exports.deleteNotification = function(id, callback){
//     var promise = notification.remove({_id:id});
//     promise.then(function () {
//         callback(null, true);
//     })
//     promise.catch(function(err){
//         callback(err)
//     })
// }

// Orders




























/**
 *
 *
 *
 *          Update Data Points
 *  Manage Vaccines
 *      Create Vaccine
 *      Update Vaccine
 *      Bulk Update Vaccines
 *      Manage Vaccine Schedules
 *          Add Vaccine Schedule
 *          Delete Vaccine Schedules
 *
 *
 *
 *
 *
 *
 *  Manage Vaccination Centers
 *      Add Vaccination Center
 *      Add Admin to vaccination center
 *      Delete Admin from vaccination center
 *
 *
 *
 *
 *
 *
 *  Manage Requests
 *      Read Requests
 *      Change Request Status
 *
 *
 *
 *  Manage Inventory
 *      Add Inventory Items
 *      Manage Orders
 *          View Orders
 *          Change Order Status
 *
 *
 *
 *  Manage Notification
 *      Edit Notification Template Messages for different languages
 *  View Reports
 */

//Guardian



module.exports = router;
