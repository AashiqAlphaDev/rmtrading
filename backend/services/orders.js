const mongoose = require("mongoose");

const orders = mongoose.model("Orders");


module.exports.createOrders = function (orderData, callback) {
	var createPromise = orders.create(orderData);
	createPromise.then(function (orders) {
		callback(null, orders)
	});
}


module.exports.allOrders = function (callback) {
	var promise = orders.find().exec();
	promise.then(function (orders) {
		callback(null, orders)
	});
	promise.catch(function (err) {
		callback(err);
	})
}


module.exports.ordersWithId = function (id, callback) {
	var promise = orders.findById(id).exec();
	promise.then(function (orders) {
		callback(null, orders);
	})
	promise.catch(function (err) {
		callback(err);
	})
}

module.exports.updateOrders = function (id, data, callback) {
	var update = orders.update({_id: id}, data);
	update.then(function () {
		callback(null, true);
	})
	update.catch(function (err) {
		callback(err)
	})
}

module.exports.deleteOrders = function (id, callback) {
	var promise = orders.remove({_id: id});
	promise.then(function () {
		callback(null, true);
	})
	promise.catch(function (err) {
		callback(err)
	})
}


