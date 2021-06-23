const ValidationParams = require('../helpers/ValidationParams')

class ProductModel{

    constructor(){
        this.name;
        this.price;
        this.category;
        this.deleted = false;
    }

    setName(name){
        return new Promise(async (resolve, reject) =>{
            try {
                await ValidationParams.validatesLengthParams(3, {ignore_whitespace: true}, name);
                this.name = name;
                resolve(true);
            } catch (error) {
                console.error('Erro ao validar nome', error);
                reject('Erro ao validar nome')
            }
        })
    }

    setPrice(price){
        return new Promise(async (resolve, reject) =>{
            try {
                price = price.toFixed(2);
                this.price = price;
                resolve(true);
            } catch (error) {
                console.error('Erro ao validar preço', error);
                reject('Erro ao validar preço')
            }
        })
    }

    setCategory(category){
        return new Promise(async (resolve, reject) =>{
            try {
                await ValidationParams.validatesLengthParams(5, {ignore_whitespace: true}, category);
                this.category = category;
                resolve(true);
            } catch (error) {
                console.error('Erro ao validar categoria', error);
                reject('Erro ao validar categoria')
            }
        })
    }
}

module.exports = ProductModel;