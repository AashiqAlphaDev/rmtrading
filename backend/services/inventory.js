const mongoose = require("mongoose")
const InventoryItems = mongoose.model('InventoryItem');

module.exports.createInventoryItem = function*(inventoryItemData){
	let existingInventoryItems = yield InventoryItems.findOne({name:inventoryItemData.name});
	if(existingInventoryItems){
		return existingInventoryItems;
	}
	return yield InventoryItems.create(inventoryItemData);
};

module.exports.updateInventoryItem = function*(id, inventoryItemData){
	return yield InventoryItems.update({_id:id},inventoryItemData);
};

module.exports.deleteInventoryItem = function*(inventoryItemId){
	return yield InventoryItems.remove({_id:inventoryItemId});
};

module.exports.inventoryItems = function*(query={}){
	return yield InventoryItems.find(query).exec();
};

module.exports.inventoryItemWithId = function*(inventoryItemId){
	return yield InventoryItems.findOne({_id:inventoryItemId}).exec();
};

module.exports.InventoryItemWithName = function*(name){
	return yield InventoryItems.findOne({name:name}).exec();
};

module.exports.deleteAll = function*(){
	return yield InventoryItems.remove({});
};

