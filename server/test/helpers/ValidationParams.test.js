const ValidationParams = require('../../helpers/ValidationParams');

describe('Testando funções de helpers/ValidationParams', () =>{
    it('validatesLengthParams(), valida se o parâmetro é maior que o length informado', async() =>{
        const a = 'test';
        const b = 'test';
        const c = 'test';
        const result = await ValidationParams.validatesLengthParams(2, a,b,c);
        expect(result).toEqual(true)
    });

    it('validatesIntegerAndPositiveNumber(), valida se um número é inteiro', async() =>{
        const result = await ValidationParams.validatesIntegerAndPositiveNumber(0);
        expect(result).toEqual(true);
    });

    it('validatesEmail(), valida se um email é válido', async() =>{
        const result = await ValidationParams.validatesEmail('testando@teste.com.br');
        expect(result).toEqual(true);
    });

    it('validatesBoolean(), valida se o parâmetro é true ou false', async() =>{
        const result = await ValidationParams.validatesBoolean(true, false);
        expect(result).toEqual(true);
    });

    it('validatesLengthParams(), passando um parâmetro com somente espaços em branco', async() =>{
        await expect(ValidationParams.validatesLengthParams(5, {ignore_whitespace: true}, '       '))
            .rejects.toMatch('parâmetro inválido ');
    });

    it('validatesLengthParams(), passando um parâmetro com tamanho inválido', async() =>{
        await expect(ValidationParams.validatesLengthParams(5, {ignore_whitespace: true}, 'test'))
            .rejects.toMatch('parâmetro inválido test');
    });

    it('validatesIntegerAndPositiveNumber(), passando um parâmetro inválido', async() =>{
        await expect(ValidationParams.validatesIntegerAndPositiveNumber('a')).rejects.toMatch('parâmetro inválido a')
    });

    it('validatesIntegerAndPositiveNumber(), passando um parâmetro vazio', async() =>{
        await expect(ValidationParams.validatesIntegerAndPositiveNumber('')).rejects.toMatch('parâmetro inválido ');
    });

    it('validatesEmail(), passando um parâmetro inválido', async() =>{
        await expect(ValidationParams.validatesEmail('testeteste.com.br')).rejects.toMatch('email inválido');
    });

    it('validatesEmail(), passando um parâmetro vazio', async() =>{
        await expect(ValidationParams.validatesEmail('')).rejects.toMatch('email inválido');
    });

    it('validatesBoolean(), passando um parâmetro inválido', async() =>{
        await expect(ValidationParams.validatesBoolean('teste')).rejects.toMatch('parâmetro inválido teste');
    });

    it('validatesBoolean(), passando um parâmetro vazio', async() =>{
        await expect(ValidationParams.validatesBoolean('')).rejects.toMatch('parâmetro inválido ')
    });
})