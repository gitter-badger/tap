'use strict';

var _ = require('lodash');
var City = require('./city.model');
var User = require('./../user/user.model');

// Get list of cities
exports.index = function (req, res) {
  var query = City.find();
  if (req.query.state) {
    query.where('state').equals(req.query.state);
  }
  if (req.query.published) {
    query.where('published').equals((String(req.query.published) === 'true'));
  }
  query.where('deleted').equals(false);
  query.exec(function (err, cities) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(cities);
  });
};

// Get a single city
exports.show = function (req, res) {
  City.findOne({_id: req.params.id, deleted: false}).lean().exec(function (err, city) {
    if (err) {
      return handleError(res, err);
    }
    if (!city) {
      return res.status(404).send('Not Found');
    }
    User.find({city: city._id, role: 'candidate'}).count(function (err, count) {
      if (err) {
        return handleError(res, err);
      }
      city.counts = {
        candidate: count
      };
      return res.json(city);
    });
  });
};

// Creates a new city in the DB.
exports.create = function (req, res) {
  City.create(req.body, function (err, city) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(city);
  });
};

// Updates an existing city in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  City.findById(req.params.id, function (err, city) {
    if (err) {
      return handleError(res, err);
    }
    if (!city) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(city, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(city);
    });
  });
};

// Deletes a city from the DB.
exports.destroy = function (req, res) {
  City.findById(req.params.id, function (err, city) {
    if (err) {
      return handleError(res, err);
    }
    if (!city) {
      return res.status(404).send('Not Found');
    }
    city.delete(function (err) {
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
