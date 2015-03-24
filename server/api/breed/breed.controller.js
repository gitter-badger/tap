'use strict';

var _ = require('lodash');
var Breed = require('./breed.model');

// Get list of breeds
exports.index = function (req, res) {
  var query = Breed.find();
  if (req.query.type) {
    query.where('type').equals(req.query.type);
  }
  query.exec(function (err, breeds) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(breeds);
  });
};

// Get a single breed
exports.show = function (req, res) {
  Breed.findById(req.params.id, function (err, breed) {
    if (err) {
      return handleError(res, err);
    }
    if (!breed) {
      return res.status(404).send('Not Found');
    }
    return res.json(breed);
  });
};

// Creates a new breed in the DB.
exports.create = function (req, res) {
  Breed.create(req.body, function (err, breed) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(breed);
  });
};

// Updates an existing breed in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Breed.findById(req.params.id, function (err, breed) {
    if (err) {
      return handleError(res, err);
    }
    if (!breed) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(breed, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(breed);
    });
  });
};

// Deletes a breed from the DB.
exports.destroy = function (req, res) {
  Breed.findById(req.params.id, function (err, breed) {
    if (err) {
      return handleError(res, err);
    }
    if (!breed) {
      return res.status(404).send('Not Found');
    }
    breed.delete(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
