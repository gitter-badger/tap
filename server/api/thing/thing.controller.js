'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');

exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

function index(req, res) {
  Thing
    .find()
    .where({deleted: false})
    .sort('-createdAt')
    .exec(mongoResult(res, function (things) {
      return res.status(200).json(things);
    }));
}

function show(req, res) {
  Thing
    .findOne()
    .where({_id: req.params.id, deleted: false})
    .exec(mongoResultWithNotFound(res, function (thing) {
      return res.json(thing);
    }));
}

function create(req, res) {
  var thing = new Thing(req.body);

  thing.save(mongoResult(res, function (thing) {
    return res.status(201).json(thing);
  }));
}

function update(req, res) {
  Thing
    .findOne()
    .where({_id: req.params.id, deleted: false})
    .exec(mongoResultWithNotFound(res, function (thing) {
      var updated = _.merge(thing, req.body, {_id: thing._id});

      updated.save(mongoResult(res, function () {
        return res.status(200).json(thing);
      }));
    }));
}

function destroy(req, res) {
  Thing
    .findById(req.params.id)
    .exec(mongoResultWithNotFound(res, function (thing) {
      thing.delete(mongoResult(res, function () {
        return res.status(204).send('No Content');
      }));
    }));
}

function mongoResult(res, callback) {
  return function (err, things) {
    if (err) {
      return handleError(res, err);
    }

    return callback(things);
  }
}

function mongoResultWithNotFound(res, callback) {
  return function (err, thing) {
    if (err) {
      return handleError(res, err);
    }

    if (!thing) {
      return res.status(404).send('No Content');
    }

    return callback(thing);
  }
}

function handleError(res, err) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(422).send(err);
  }

  return res.status(500).send(err);
}
