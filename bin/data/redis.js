var redis = require('redis');
var config = require('./config/config');

module.exports = redis.createClient(config.redis);
