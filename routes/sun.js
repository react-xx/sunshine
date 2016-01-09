var express = require('express');
var router = express.Router();
var redisClient = require('../config/redis');

/* GET users listing. */
router.post('/hotList', function(req, res, next) {
    redisClient.lrange('hotList', 0, 0, function(err, hotList){
        if (err) {
            next(err);
        };
        if (hotList.length > 0) {
            var hotList = {
                success: true,
                page: {
                     pageNo: 1,
                     allPage: 20
                },
                result: JSON.parse(hotList)
            }
            res.send(hotList);
        }
        else {
            res.send('无数据！');
            //res.send(JSON.parse(lists));
        }

    });
});

module.exports = router;
