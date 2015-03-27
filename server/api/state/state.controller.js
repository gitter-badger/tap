'use strict';

var _ = require('lodash');
var State = require('./state.model');

// Get list of states
exports.index = function (req, res) {
  var query = State.find();
  if (req.query.published) {
    query.where('published').equals((String(req.query.published) === 'true'));
  }
  query.where('deleted').equals(false);
  query.exec(function (err, states) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(states);
  });
};

// Get a single state
exports.show = function (req, res) {
  State.findOne({_id: req.params.id, deleted: false}, function (err, state) {
    if (err) {
      return handleError(res, err);
    }
    if (!state) {
      return res.status(404).send('Not Found');
    }
    return res.json(state);
  });
};

// Creates a new state in the DB.
exports.create = function (req, res) {
  State.create(req.body, function (err, state) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(state);
  });
};

// Updates an existing state in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  State.findById(req.params.id, function (err, state) {
    if (err) {
      return handleError(res, err);
    }
    if (!state) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(state, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(state);
    });
  });
};

// Deletes a state from the DB.
exports.destroy = function (req, res) {
  State.findById(req.params.id, function (err, state) {
    if (err) {
      return handleError(res, err);
    }
    if (!state) {
      return res.status(404).send('Not Found');
    }
    state.delete(function (err) {
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
