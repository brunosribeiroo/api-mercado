const {promisify} = require('util');
const RedisConnection = require('../infra/RedisConnection');

class CacheRepository{

    set(key, value){
        return new Promise(async(resolve, reject) =>{
            try {
                const setAsyncRedis = promisify(RedisConnection.cache().set).bind(RedisConnection.cache());
                await setAsyncRedis(key, JSON.stringify(value));
                resolve(true)
            } catch (error) {
                reject('Erro ao adicionar cache ao redis ' + error)
            }
        })
    }

    get(key){
        return new Promise(async(resolve, reject) =>{
            try {
                const getAsyncRedis = promisify(RedisConnection.cache().get).bind(RedisConnection.cache());
                const get = await getAsyncRedis(key);
                const result = JSON.parse(get);
                resolve(result)
            } catch (error) {
                reject('Erro ao buscar cache no redis ' + error)
            }
        })
    }

    del(key){
        return new Promise(async(resolve, reject) =>{
            try {
                const delAsyncRedis = promisify(RedisConnection.cache().del).bind(RedisConnection.cache());
                const del = await delAsyncRedis(key);
                resolve(del)
            } catch (error) {
                reject('Erro ao deletar cache no redis ' + error)
            }
        })
    }

    flushDB(){
        return new Promise(async(resolve, reject) =>{
            try {
                const flushAsyncRedis = promisify(RedisConnection.cache().flushdb).bind(RedisConnection.cache());
                const flush = await flushAsyncRedis();
                resolve(true)
            } catch (error) {
                reject('Erro ao apagar chaves do redis ' + error)
            }
        })
    }

}

module.exports = new CacheRepository;