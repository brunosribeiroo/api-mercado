const express = require('express');
const Timeout = require('connect-timeout');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const cookieParser = require('cookie-parser');
const routes = require('../routes/routes');

module.exports = () =>{
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(Timeout('35s'));
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use(cookieParser());
    routes(app);
    return app;
}