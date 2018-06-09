var Router = require("express").Router
var router = Router();
const co = require("co");
const InventoryManagementService = require("../services/inventory")
const isAdmin = require("./super-admin/check-admin")

router.get("/", co.wrap(function*(req, res, next){
	var query = {};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let diseases = yield InventoryManagementService.inventoryItems(query);
	res.send(diseases);
}));

router.get("/:inventory_id", co.wrap(function*(req, res, next){
	let disease = yield InventoryManagementService.inventoryItemWithId(req.params.inventory_id);
	res.send(disease);
}));

router.post("/",isAdmin, co.wrap(function*(req, res, next){
	let disease = yield InventoryManagementService.createInventoryItem(req.body);
	res.send(disease);
}));

router.put("/:inventory_id",isAdmin, co.wrap(function*(req, res, next){
	let disease = yield InventoryManagementService.updateInventoryItem(req.params.inventory_id,req.body);
	res.send(disease);
}));

router.delete("/:inventory_id",isAdmin, co.wrap(function*(req, res, next){
	yield InventoryManagementService.deleteInventoryItem(req.params.inventory_id);
	res.send({});
}));


module.exports = router;