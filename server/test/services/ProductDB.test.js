const { ObjectId } = require('mongodb');
const ProductDB = require('../../services/ProductDB');

describe('Testando funções de services/ProductDB', () =>{
    it('insertOne(), adiciona produto ao DB', async() =>{
        const result = await ProductDB.insertOne({
            name: 'Barra de sabão',
            price: 1.99,
            category: 'Produto de Limpeza',
            deleted: false
        });
        expect(result).toMatchObject({id: expect.anything()});
    });

    it('selectOne(), busca um produto no DB', async() =>{
        const result = await ProductDB.selectOne({name: 'Detergente 200ml'});
        expect(result).toMatchObject({name: 'Detergente 200ml'});
    });

    it('selectOne(), busca um produto no cache', async() =>{
        const result = await ProductDB.selectOne({_id: '60b6c8469ee27b009a1b60b7'});
        expect(result).toMatchObject({name: 'Detergente 200ml'});
    });

    it('selectOne(), busca um produto no cache/DB com ID inexistente', async() =>{
        const result = await ProductDB.selectOne({_id: '60b6c8469ee27b111a1b60b7'});
        expect(result).toBe(false);
    });

    it('selectMany(), busca vários produtos no DB', async() =>{
        const result = await ProductDB.selectMany({name: 'Detergente 200ml'});
        expect(result[0]).toMatchObject({name: 'Detergente 200ml'});
    });
    
    it('selectMany(), busca vários produtos no cache', async() =>{
        const result = await ProductDB.selectMany();
        expect(result.length >= 1 && result[0] != false).toBe(true);
    });

    it('selectMany(), busca vários produtos no cache/DB com parâmetro inexistente', async() =>{
        const result = await ProductDB.selectMany({name: 'testenaoexiste'});
        expect(result[0]).toBe(false);
    });

    it('update(), atualiza os documentos de acordo com o filtro informado', async() =>{
        const result = await ProductDB.update({name: 'Detergente 200ml'}, {price: 4.50});
        expect(Number.isInteger(result)).toBe(true);
    });

    it('delete(), deve mudar o status deleted para true do produto por ID', async() =>{
        const result = await ProductDB.delete('60b6c8469ee27b009a1b60b7');
        expect(Number.isInteger(result)).toBe(true);
    })
})