'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');

exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

function index(req, res) {
  Thing.find({deleted: false}, {}, {sort: '-createdAt'}, function (err, things) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(things);
  });
}

function show(req, res) {
  Thing.findOne({_id: req.params.id, deleted: false}, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.status(404).send('Not Found');
    }
    return res.json(thing);
  });
}

function create(req, res) {
  Thing.create(req.body, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(thing);
  });
}

function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Thing.findOne({_id: req.params.id, deleted: false}, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(thing);
    });
  });
}

function destroy(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.status(404).send('Not Found');
    }
    thing.delete(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}
