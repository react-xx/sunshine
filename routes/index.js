var express = require('express');
var router = express.Router();
var robot = require('../bin/data/robot');

/* GET home page. */
router.get('/', function(req, res, next) {
    robot(function (data) {
        res.send(data);
    });
});

module.exports = router;
