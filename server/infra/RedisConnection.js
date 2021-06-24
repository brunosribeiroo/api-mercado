const Redis = require('redis');

class RedisConnection{

    cache(){
        return Redis.createClient('redis://redis:6379');
    };
}

module.exports = new RedisConnection;