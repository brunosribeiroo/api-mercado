const Mongo = require('../infra/MongoConnection');

class ProductDB{

    insertOne(product){
        return new Promise(async(resolve, reject) =>{
            const conn = await Mongo();
            try {
                const insert = await conn.db('supermarket').collection('products').insertOne(product);
                const obj = {id: insert.insertedId.toString()};
                conn.close();
                resolve(obj);
            } catch (error) {
                conn.close();
                reject('Erro ao inserir produto no DB ' + error)
            }
        })
    }

    selectOne(data){
        return new Promise(async (resolve, reject) =>{
            const conn = await Mongo();
            try {
                const select = await conn.db('supermarket').collection('products').find(data || {}).limit(1).toArray();
                conn.close();
                select.length > 0 ? resolve(select[0]) : resolve(false);
            } catch (error) {
                conn.close();
                reject('Erro ao pesquisar produto no DB ' + error)
            }
        })
    }

    selectMany(data){
        return new Promise(async (resolve, reject) =>{
            const conn = await Mongo();
            try {
                const select = await conn.db('supermarket').collection('products').find(data || {}).toArray();
                conn.close();
                select.length > 0 ? resolve(select) : resolve(false);
            } catch (error) {
                conn.close();
                reject('Erro ao pesquisar vários produtos no DB ' + error)
            }
        })
    }

    update(filter, update){
        return new Promise(async(resolve, reject) =>{
            const conn = await Mongo();
            try {
                const updateDocument = {$set: update};
                const result = await conn.db('supermarket').collection('products').update(filter, updateDocument, {multi: true});
                conn.close();
                resolve(result.result.nModified);
            } catch (error) {
                conn.close();
                reject('Erro ao atualizar produtos no DB ' + error)
            }
        })
    }
}

module.exports = new ProductDB;