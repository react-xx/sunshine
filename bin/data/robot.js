// 用 superagent 去抓取页面的内容

var cheerio = require('cheerio');
var iconv = require('iconv');
var superagent = require('superagent');
var async = require('async');
var redisClient = require('../../config/redis');

function robot(callback) {
    var url = 'http://www.qiushibaike.com/8hr/page/'
    var page = [];
    for (var i = 1; i < 21; i++) {
        page.push(url + i);
    };
    redisClient.del('ists');
    var allList = [];
    async.each(page, function (item, done) {
        superagent.get(item)
            .end(function(err, sres) {
                if (err) {
                    throw err;
                }
                var $ = cheerio.load(sres.text);
                var list = [];
                $('.article').each(function(k, v) {
                    var title = $(this).children('.content');
                    var img = $(this).find('.thumb img');
                    var item = {
                        title: title.text().replace(/[\n]/ig,''),
                        src: img.attr('src')
                    };
                    list.push(item);
                });
                redisClient.rpush('ists', JSON.stringify(list));
            }
        );
    }, function (err) {
        if (err) {
            throw err;
        };
        console.log('抓取成功');
    });
}

module.exports = robot;
