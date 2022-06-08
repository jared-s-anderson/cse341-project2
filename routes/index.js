const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

const routes = express.Router();

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', requiresAuth(), swaggerUi.setup(swaggerDocument));
routes.use('/comics', require('./comics'));

module.exports = routes;
