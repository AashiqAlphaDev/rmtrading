const Router = require("express").Router;
const router = Router();
var vaccineCenter = require("../services/vaccinationCenters");

router.post("/vaccines",function(req,res,next){
    vaccineCenter.createVaccineCenters(req.body,function(vaccine){
        res.send(vaccine);
    });
});

router.get("/vaccines", function(req, res, next){
    vaccineCenter.vaccineCenters(function (vaccine) {
        res.send(vaccine);
    });
});

router.get("/vaccines/:id", function(req, res, next){
    vaccineCenter.vaccineCentersWithId(req.query.id,function (vaccine) {
        res.send(vaccine);
    });
});

router.put("/vaccines/:id", function(req, res, next){
    vaccineCenter.updateVaccineCenter(req.query.id,req.body,function (vaccine) {
        res.send(vaccine);
    });
});

router.delete("/vaccines/:id", function(req, res, next){
    vaccineCenter.deleteVaccineCenter(function (vaccine) {
        res.send(vaccine);
    });
});

module.exports = router;
