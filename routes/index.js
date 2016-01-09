var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('这是后台系统，欢迎访问。。O(∩_∩)O');
});

module.exports = router;
