const ProductModel = require('../../models/ProductModel');

describe('Testando objeto models/ProductModel', () =>{
    it('Cria objeto ProductModel', async() =>{
        const Product = new ProductModel();
        await Product.setName('Detergente 200ml');
        await Product.setPrice(1.99);
        await Product.setCategory('Produto de Limpeza');
        expect(Product).toMatchObject({name: 'Detergente 200ml'})
    })

    it('setName(), passando parâmetro vazio', async() =>{
        const Product = new ProductModel();
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        await expect(Product.setName(' ')).rejects.toMatch('Erro ao validar nome')
    });

    it('setName(), passando parâmetro com tamanho inválido', async() =>{
        const Product = new ProductModel();
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        await expect(Product.setName('te')).rejects.toMatch('Erro ao validar nome')
    });

    it('setPrice(), passando parâmetro inválido', async() =>{
        const Product = new ProductModel();
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        await expect(Product.setPrice(' ')).rejects.toMatch('Erro ao validar preço')
    });

    it('setCategory(), passando parâmetro vazio', async() =>{
        const Product = new ProductModel();
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        await expect(Product.setCategory(' ')).rejects.toMatch('Erro ao validar categoria')
    });

    it('setCategory(), passando parâmetro inválido', async() =>{
        const Product = new ProductModel();
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        await expect(Product.setCategory('test')).rejects.toMatch('Erro ao validar categoria')
    });
})