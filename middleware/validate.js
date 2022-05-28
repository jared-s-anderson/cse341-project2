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

module.exports = {
  saveComic
};
