var express = require('express');
var router = express.Router();
var redisClient = require('../config/redis');

/* GET users listing. */
router.get('/', function(req, res, next) {
    redisClient.lrange('ists', 0, 0, function(err, lists){
        if (err) {
            next(err);
        };
        if (lists.length > 0) {
            res.send(JSON.parse(lists));
        }
        else {
            res.send('无数据！');
            //res.send(JSON.parse(lists));
        }

    });
});

module.exports = router;
