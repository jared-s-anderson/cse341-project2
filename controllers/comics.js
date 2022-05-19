const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// This gets all of the comic information.
const retrieveAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('comics').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// This gets information for one of the comics.
const retriveSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('comics').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// This adds a comic to the database.
const addComic = async (req, res) => {
  const newComic = {
    title: req.body.title,
    issue: req.body.issue,
    publication_date: req.body.publication_date,
    page_count: req.body.page_count,
    cover_price: req.body.cover_price,
    publisher: req.body.publisher,
    artists: req.body.artists,
    writers: req.body.writers,
    editors: req.body.editors
  };
  const response = await mongodb.getDb().db().collection('comics').insertOne(newComic);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred while trying to add a comic.');
  }
};

// This updates a comic in the database.
const updateComic = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const existingComic = {
    title: req.body.title,
    issue: req.body.issue,
    publication_date: req.body.publication_date,
    page_count: req.body.page_count,
    cover_price: req.body.cover_price,
    publisher: req.body.publisher,
    artists: req.body.artists,
    writers: req.body.writers,
    editors: req.body.editors
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('comics')
    .replaceOne({ _id: userId }, existingComic);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while trying to update a comic.');
  }
};

// This deletes one of the comics from the database.
const deleteComic = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('comics').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while trying to delete a comic.');
  }
};

module.exports = {
  retrieveAll,
  retriveSingle,
  addComic,
  updateComic,
  deleteComic
};
