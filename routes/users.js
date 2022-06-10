const express = require('express');
const routes = express.Router();

const userController = require('../controllers/users');
const validation = require('../middleware/validate');

routes.get('/', userController.retrieveAll);

routes.get(':/id', userController.retriveSingle);

routes.post('/', validation.saveUser, userController.addUser);

routes.put('/:id', validation.saveUser, userController.updateUser);

routes.delete(':/id', userController.deleteUser);

module.exports = routes;
