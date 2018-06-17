var Router = require("express").Router
var router = Router();
const co = require("co");
const CountryManagementService = require("../services/country")
const isAdmin = require("./super-admin/check-admin")

router.get("/", httpCoWrap(function*(req, res, next){
	var query = req.query.query?req.query.query:{};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let countries = yield CountryManagementService.countries(query);
	res.send(countries);
}));

router.get("/:country_id", httpCoWrap(function*(req, res, next){
	let country = yield CountryManagementService.countryWithId(req.params.country_id);
	res.send(country);
}));

router.post("/",isAdmin, httpCoWrap(function*(req, res, next){
	let country = yield CountryManagementService.createCountry(req.body);
	res.send(country);
}));

router.put("/:country_id", isAdmin,httpCoWrap(function*(req, res, next){
	let country = yield CountryManagementService.updateCountry(req.params.country_id,req.body);
	res.send(country);
}));

router.delete("/:country_id", isAdmin, httpCoWrap(function*(req, res, next){
	yield CountryManagementService.deleteCountry(req.params.country_id);
	res.send({});
}));


module.exports = router;