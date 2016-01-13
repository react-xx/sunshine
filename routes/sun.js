var express = require('express');
var router = express.Router();
var redisClient = require('../config/redis');
var robot = require('../bin/data/robot');

//获取热门列表
router.post('/hotList', function(req, res, next) {
    var pageNo = +req.body.pageNo;
    var dataTpye = req.body.dataType;
    console.log(dataTpye);
    redisClient.lrange(dataTpye, pageNo, pageNo, function(err, hotList){
        if (err) {
            next(err);
        };
        if (hotList && hotList.length > 0) {
            var hotList = {
                success: true,
                page: {
                     pageNo: pageNo,
                     allPage: 20
                },
                result: JSON.parse(hotList)
            }
            res.set('Content-Type', 'application/json');
            res.send(hotList);
        }
        else {
            res.send('无数据！');
        }

    });
});

//抓取开始抓取数据

router.get('/admin/getHot', function(req, res, next) {
    robot();
    res.send('您的请求已经收到，后台正在努力抓取最新的数据。。。');
});

module.exports = router;
