const MongoClient = require('mongodb').MongoClient;

class MongoConnection{
    
    constructor(){
        this.connection = '';
    }

    conn(){
        return new Promise((resolve, reject) =>{
            var URI = 'mongodb://mongo:27017';
            MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) =>{
                if(err){
                    console.error('Erro ao conectar ao mongoDB', err);
                    reject('Erro ao conectar ao mongoDB', err)
                } else {
                    resolve(db)
                }
            })
        })
    }

    get(){
        return new Promise(async(resolve, reject) =>{
            try {
                if(!this.connection){
                    const conn = await this.conn();
                    this.connection = conn
                    console.log('nova conexão')
                    resolve(this.connection);
                } else {
                    console.log('já possui conexao')
                    resolve(this.connection);
                }
            } catch (error) {
                console.error('Erro ao gerar conexão com mongo', error);
                reject('Erro ao gerar conexão com mongo ' + error)
            }
        })
    }
}

module.exports = new MongoConnection;