const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

// This gets information for all of the users.
const retrieveAll = async (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('users')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

// This gets information for a single user.
const retriveSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('A valid id must be used to get user information.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('users')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

// This adds a user to the database.
const addUser = async (req, res) => {
  const newUser = {
    tenant: req.body.tenant,
    connection: req.body.connection,
    email: req.body.email,
    password: req.body.password,
    debug: req.body.debug
  };
  const response = await mongodb.getDb().db().collection('users').insertOne(newUser);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred while trying to add a user.');
  }
};

// This updates a user in the database.
const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("A valid id must be used to update a user's information.");
  }
  const userId = new ObjectId(req.params.id);
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(password, salt);
  const existingUser = {
    tenant: req.body.tenant,
    connection: req.body.connection,
    email: req.body.email,
    password: req.body.password,
    debug: req.body.debug
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('users')
    .replaceOne({ _id: userId }, existingUser);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while trying to update a user.');
  }
};

// This deletes a user from the database.
const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('A valid id must be used to delete a user.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while trying to delete a user.');
  }
};

module.exports = {
  retrieveAll,
  retriveSingle,
  addUser,
  updateUser,
  deleteUser
};
