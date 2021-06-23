# API-Mercado [EM DESENVOLVIMENTO]

API para listagem, cadastro, edição e exclusão de itens de supermercado.

Sendo desenvolvido em NodeJS com Express, banco MongoDB, Docker e Redis para serviço de cache.

Testes unitários e de integração com Jest e Supertest.

## Configurando Ambientes

### Download e Instalação 
Baixar e instalar
1.  <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png"></code> [NodeJS - Versão LTS](https://nodejs.org/pt-br/download/)
2.  <code><img height="20" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png"></code> [Docker Desktop](https://www.docker.com/products/docker-desktop)
--------------------------------------------------------------------------

### Execute no terminal 
1.  ```git clone https://github.com/brunosribeiroo/api-mercado```
2.  ```cd server```
3.  ```npm install```
4.  ```npm run swagger-autogen```  
--------------------------------------------------------------------------
## Configurando Docker
Execute no terminal ./server
1. ```docker-compose up --build```
--------------------------------------------------------------------------
## Testes
Execute no terminal server_app_1 no docker
1.  ```npm test```
--------------------------------------------------------------------------
## Documentação
[Swagger](http://localhost:3000/doc)



