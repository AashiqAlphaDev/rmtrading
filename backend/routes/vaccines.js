const Router = require("express").Router
const router = Router();
var vaccineRepo = require("../services/vaccines")


router.post("/vaccines",function(req,res,next){
    vaccineRepo.createVaccine(req.body,function(vaccine){
        res.send(vaccine);
    });
});

router.get("/vaccines", function(req, res, next){
    vaccineRepo.vaccines(function (vaccine) {
        res.send(vaccine);
    });
});

router.get("/vaccines/:id", function(req, res, next){
    vaccineRepo.vaccineWithId(req.query.id,function (vaccine) {
        res.send(vaccine);
    });
});

router.put("/vaccines/:id", function(req, res, next){
    vaccineRepo.updateVaccine(req.query.id,req.body,function (vaccine) {
        res.send(vaccine);
    });
});

router.delete("/vaccines/:id", function(req, res, next){
    vaccineRepo.deleteVaccine(function (vaccine) {
        res.send(vaccine);
    });
});

module.exports = router;
