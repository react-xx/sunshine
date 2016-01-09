// 用 superagent 去抓取页面的内容

var cheerio = require('cheerio');
var iconv = require('iconv');
var superagent = require('superagent');
var async = require('async');
var redisClient = require('../../config/redis');
var urlQiubai = require('../../config/config').qiubai;

function robot(callback) {
    var url = urlQiubai;
    var page = [];
    for (var i = 1; i < 21; i++) {
        page.push(url + i);
    };
    redisClient.del('hotList');
    async.each(page,
        function (item, done) {
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
                            text: title.text().replace(/[\n]/ig,''),
                            src: img.attr('src')
                        };
                        list.push(item);
                    });
                    redisClient.rpush('hotList', JSON.stringify(list));
                }
            );
        },
        function (err) {
            if (err) {
                throw err;
            };
            console.log('抓取成功');
        }
    );
}

module.exports = robot;
