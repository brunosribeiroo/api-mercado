const CacheRepository = require('../../repository/CacheRepository');

describe('Testando funções de repository/CacheRepository', () =>{
    it('set(), adiciona documento ao redis', async() =>{
        const result = await CacheRepository.set('testando', {name: 'teste'});
        expect(result).toBe(true)
    });

    it('get(), busca documento no redis', async() =>{
        const result = await CacheRepository.get('testeInicial');
        expect(result).toMatchObject({name: 'Detergente 200ml'})
    });

    it('get(), busca documento no redis passando key inexistente', async() =>{
        const result = await CacheRepository.get('testeInexistente');
        expect(result).toBe(null)
    });

    it('del(), deleta o documento no redis', async() =>{
        const result = await CacheRepository.del('testedel');
        await CacheRepository.set('testedel', {
            _id: 'testedel',
            name: 'Detergente 200ml',
            price: 1.99,
            category: 'Produto de Limpeza',
            deleted: false});
        expect(result).toBe(1)
    });

    it('del(), deleta o documento no redis passando key inexistente', async() =>{
        const result = await CacheRepository.del('testedelnaoexiste');
        expect(result).toBe(0)
    });

    it('flushDB(), deleta todos os documentos do redis', async() =>{
        const result = await CacheRepository.flushDB();
        expect(result).toBe(true)
    });
})
