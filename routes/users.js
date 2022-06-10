const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const routes = express.Router();

const userController = require('../controllers/users');
const validation = require('../middleware/validate');

routes.get('/', requiresAuth(), userController.retrieveAll);

routes.get('/:id', requiresAuth(), userController.retrieveSingle);

routes.post('/', requiresAuth(), validation.saveUser, userController.addUser);

routes.put('/:id', requiresAuth(), validation.saveUser, userController.updateUser);

routes.delete('/:id', requiresAuth(), userController.deleteUser);

module.exports = routes;
