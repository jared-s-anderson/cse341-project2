const express = require('express');
const routes = express.Router();

const comicsController = require('../controllers/comics');
const validation = require('../middleware/validate');

// This get request retrieves information for all of the comics in the database.
routes.get('/', comicsController.retrieveAll);

// This get request retrives information for a single issue.
routes.get('/:id', comicsController.retriveSingle);

// This post request adds a comic to the database.
routes.post('/', validation.saveComic, comicsController.addComic);

// This put request updates an existing comic in the database.
routes.put('/:id', validation.saveComic, comicsController.updateComic);

// This delete request deletes one of the comics from the database.
routes.delete('/:id', comicsController.deleteComic);

module.exports = routes;
