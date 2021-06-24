const { ObjectId } = require('mongodb');
const MongoRepository = require('../../repository/MongoRepository');

describe('Testando funções de repository/MongoRepository', () =>{
    it('insertOne(), adiciona documento ao DB', async() =>{
        const result = await MongoRepository.insertOne('supermarket', 'products', {
            name: 'Barra de sabão',
        });
        expect(result).toMatchObject({id: expect.anything()});
    });

    it('selectOne(), busca um documento no DB', async() =>{
        const result = await MongoRepository.selectOne('supermarket', 'products', {name: 'Detergente 200ml'});
        expect(result).toMatchObject({name: 'Detergente 200ml'});
    });

    it('selectOne(), busca um documento no DB com parâmetro inexistente', async() =>{
        const result = await MongoRepository.selectOne('supermarket', 'products', {name: 'testando'});
        expect(result).toBe(false);
    });

    it('selectMany(), busca vários documentos no DB', async() =>{
        const result = await MongoRepository.selectMany('supermarket', 'products', {name: 'Detergente 200ml'});
        expect(result[0]).toMatchObject({name: 'Detergente 200ml'});
    });

    it('selectMany(), busca vários documentos no DB com parâmetro inexistente', async() =>{
        const result = await MongoRepository.selectMany('supermarket', 'products', {name: 'testando'});
        expect(result[0]).toBe(false);
    });

    it('update(), atualiza os documentos de acordo com o filtro informado', async() =>{
        const result = await MongoRepository.update('supermarket', 'products', {name: 'Barra de sabão'}, {name: 'Detergente 200ml'});
        expect(Number.isInteger(result)).toBe(true);
    });
})