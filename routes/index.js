const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const routes = express.Router();

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));
routes.use('/comics', require('./comics'));

module.exports = routes;
