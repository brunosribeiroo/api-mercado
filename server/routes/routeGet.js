const ProductDB = require('../services/ProductDB');

module.exports = (app) =>{
    app.get('/', (req, res) =>{
        res.send('teste ok')
    })
}