const validator = require('../helpers/validate');

const saveComic = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    issue: 'required|integer',
    publication_date: 'required|date',
    page_count: 'required|integer',
    cover_price: 'required|numeric',
    publisher: 'required|string',
    artists: 'required|string',
    writers: 'required|string',
    editors: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule2 = {
    tenant: 'requried|string',
    connection: 'required|string',
    email: 'required|email',
    password: 'required|string',
    debug: 'requred|string'
  };

  validator(req.body, validationRule2, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveComic,
  saveUser
};
