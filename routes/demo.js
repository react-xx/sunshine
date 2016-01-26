var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ball', function(req, res, next) {
    res.sendfile("./public/css3_transform/ball.html");
});

router.get('/animation', function(req, res, next) {
    res.sendfile("./public/css3_transform/animation.html");
});

router.get('/gradient', function(req, res, next) {
    res.sendfile("./public/css3_transform/gradient.html");
});

router.get('/shadow', function(req, res, next) {
    res.sendfile("./public/css3_transform/shadow.html");
});

router.get('/transform', function(req, res, next) {
    res.sendfile("./public/css3_transform/transform.html");
});

router.get('/transition', function(req, res, next) {
    res.sendfile("./public/css3_transform/transition.html");
});
module.exports = router;
