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
        const result = await ProductDB.selectOne({name: "Detergente 200ml"});
        expect(result).toMatchObject({name: 'Detergente 200ml'});
    });

    it('selectMany(), busca vários produto no DB', async() =>{
        const result = await ProductDB.selectMany();
        expect(result[0]).toMatchObject({name: 'Detergente 200ml'});
    });

    it('update(), atualiza os documentos de acordo com o filtro informado', async() =>{
        const result = await ProductDB.update({name: "Detergente 200ml"}, {price: 4.50});
        expect(Number.isInteger(result)).toBe(true);
    });
})