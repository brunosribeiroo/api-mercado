const { ObjectId } = require('mongodb');
const MongoRepository = require('../repository/MongoRepository');
const CacheRepository = require('../repository/CacheRepository');

class ProductDB{

    insertOne(product){
        return new Promise(async(resolve, reject) =>{
            try {
                const insert = await MongoRepository.insertOne('supermarket', 'products', product);
                await CacheRepository.set(insert.id, product);
                resolve(insert);
            } catch (error) {
                reject('Erro ao inserir produto no DB ' + error)
            }
        })
    }

    selectOne(data){
        return new Promise(async (resolve, reject) =>{
            try {
                if(data._id){
                    const cache = await CacheRepository.get(data._id);
                    if(cache === null){
                        const select = await MongoRepository.selectOne('supermarket', 'products', data);
                        select === false ? resolve(select) : await CacheRepository.set(select._id.toString(), select);
                        resolve(select)
                    } else {
                        resolve(cache)
                    }
                } else {
                     const select = await MongoRepository.selectOne('supermarket', 'products', data);
                     await CacheRepository.set(select._id.toString(), select);
                     resolve(select)
                }
            } catch (error) {
                reject('Erro ao pesquisar produto no DB ' + error)
            }
        })
    }

    selectMany(data){
        return new Promise(async (resolve, reject) =>{
            try {
                if(!data){
                    const cache = await CacheRepository.get('allProducts');
                    if(cache === null){
                        const select = await MongoRepository.selectMany('supermarket', 'products', {});
                        select === false ? resolve(select) : await CacheRepository.set('allProducts', select);
                        resolve(select)
                    } else {
                        resolve(cache);
                    }
                }
                if(data){
                    const select = await MongoRepository.selectMany('supermarket', 'products', data);
                    resolve(select)
                }
            } catch (error) {
                reject('Erro ao pesquisar vários produtos no DB ' + error)
            }
        })
    }

    update(filter, update){
        return new Promise(async(resolve, reject) =>{
            try {
                const result = await MongoRepository.update('supermarket', 'products', filter, update);
                await CacheRepository.flushDB();
                resolve(result);
            } catch (error) {
                reject('Erro ao atualizar produtos no DB ' + error)
            }
        })
    }

    delete(id){
        return new Promise(async(resolve, reject) =>{
            try {
                const result = await MongoRepository.update('supermarket', 'products', {_id: ObjectId(id)}, {deleted: true});
                await CacheRepository.flushDB();
                resolve(result);
            } catch (error) {
                reject('Erro ao atualizar produtos no DB ' + error)
            }
        })
    }
}

module.exports = new ProductDB;