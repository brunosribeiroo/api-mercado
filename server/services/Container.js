const Mongo = require('../infra/MongoConnection');

class Container{

    MongoConnection(){
        return new Promise(async(resolve, reject) =>{
            try {
                const conn = await Mongo.get();
                resolve(conn)
            } catch (error) {
                console.error('Erro em Container.MongoConnection', error);
                reject('Erro em Container.MongoConnection ' + error);
            }
        })
    }
}

module.exports = new Container;