const MongoClient = require('mongodb').MongoClient;

function conn(){
    return new Promise((resolve, reject) =>{
        var URI = 'mongodb://mongo:27017';
        MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) =>{
            if(err){
                console.error('Erro ao conectar ao mongoDB', err);
                reject(err);
            } else {
                resolve(db);
            }
        })
    })
}


module.exports = conn;