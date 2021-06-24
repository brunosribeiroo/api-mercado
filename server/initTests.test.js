const { ObjectId } = require('mongodb');
const ProductDB =  require('./services/ProductDB');
const CacheRepository = require('./repository/CacheRepository');

describe('Suite de testes iniciais', () =>{
    it('Adiciona produto ao DB', async() =>{
        const result = await ProductDB.insertOne({
            _id: ObjectId('60b6c8469ee27b009a1b60b7'),
            name: 'Detergente 200ml',
            price: 1.99,
            category: 'Produto de Limpeza',
            deleted: false
        });
        expect(result).toBe({_id: '60b6c8469ee27b009a1b60b7'})
    });

    it('Adiciona produto ao DB', async() =>{
        const result = await ProductDB.insertOne({
            name: 'Barra de sabão',
            price: 1.99,
            category: 'Produto de Limpeza',
            deleted: false
        });
        expect(result).toMatchObject({id: expect.anything()})
    });

    it('Adiciona documento ao redis', async() =>{
        const result = await CacheRepository.set('60b6c8469ee27b009a1b60b7', {
            _id: '60b6c8469ee27b009a1b60b7',
            name: 'Detergente 200ml',
            price: 1.99,
            category: 'Produto de Limpeza',
            deleted: false});
        expect(result).toBe(true)
    });

    it('Adiciona documento ao redis para teste de exclusão', async() =>{
        const result = await CacheRepository.set('testedel', {
            _id: 'testedel',
            name: 'Detergente 200ml',
            price: 1.99,
            category: 'Produto de Limpeza',
            deleted: false});
        expect(result).toBe(true)
    });
})