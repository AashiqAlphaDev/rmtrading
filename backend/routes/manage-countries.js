var Router = require("express").Router
var router = Router();
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


router.post("/:country_id/states",isAdmin, httpCoWrap(function*(req, res, next){
	let country = yield CountryManagementService.createState(req.params.country_id,req.body);
	res.send(country);
}));

router.get("/:country_id/states",isAdmin, httpCoWrap(function*(req, res, next){
	var query = req.query.query?req.query.query:{};
	if(req.query.q){
		query.name = {$regex:`.*${req.query.q}.*`, '$options' : 'i'}
	}
	let states = yield CountryManagementService.states(req.params.country_id,query);
	res.send(states);
}));


module.exports = router;