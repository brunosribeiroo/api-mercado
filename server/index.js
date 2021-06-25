const customExpress = require('./config/customExpress');
const app = customExpress();

const cluster = require('cluster');
var numCPUs = require('os').cpus().length;

const PORT = 3000;

if(cluster.isMaster){
    for(var i = 0; i< numCPUs; i++){
        cluster.fork();
    }
} else if(cluster.isWorker){
    
    app.listen(PORT, async () =>{
        console.log('Servidor Online na porta 3000')
    });
}
