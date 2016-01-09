var express = require('express');
var router = express.Router();
var robot = require('../bin/data/robot');

/* GET home page. */
router.get('/', function(req, res, next) {
    robot();
    res.send('您的请求已经收到，后台正在努力抓取数据。。。')
});

module.exports = router;
