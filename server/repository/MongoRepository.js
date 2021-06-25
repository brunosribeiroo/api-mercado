const Container = require('../services/Container');
class MongoRepository{

    insertOne(db, collection, product){
        return new Promise(async(resolve, reject) =>{
            try {
                const conn = await Container.MongoConnection();
                const insert = await conn.db(db).collection(collection).insertOne(product);
                const obj = {id: insert.insertedId.toString()};
                resolve(obj);
            } catch (error) {
                reject('Erro ao inserir documento no DB ' + error)
            }
        })
    }

    selectOne(db, collection, data = {}){
        return new Promise(async (resolve, reject) =>{
            try {
                const conn = await Container.MongoConnection();
                data.deleted = false;
                const select = await conn.db(db).collection(collection).find(data).limit(1).toArray();
                select.length > 0 ? resolve(select[0]) : resolve(false);
            } catch (error) {
                reject('Erro ao pesquisar documento no DB ' + error)
            }
        })
    }

    selectMany(db, collection, data = {}){
        return new Promise(async (resolve, reject) =>{
            try {
                const conn = await Container.MongoConnection();
                data.deleted = false;
                const select = await conn.db(db).collection(collection).find(data).toArray();
                select.length > 0 ? resolve(select) : resolve([false]);
            } catch (error) {
                reject('Erro ao pesquisar vários documentos no DB ' + error)
            }
        })
    }

    update(db, collection, filter, update){
        return new Promise(async(resolve, reject) =>{
            try {
                const conn = await Container.MongoConnection();
                filter.deleted = false;
                const updateDocument = {$set: update};
                const result = await conn.db(db).collection(collection).update(filter, updateDocument, {multi: true});
                resolve(result.result.nModified);
            } catch (error) {
                reject('Erro ao atualizar documentos no DB ' + error)
            }
        })
    }
}

module.exports = new MongoRepository;