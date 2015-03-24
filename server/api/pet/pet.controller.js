'use strict';

var _ = require('lodash');
var Pet = require('./pet.model');

// Get list of pets
exports.index = function (req, res) {
  Pet.find(function (err, pets) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(pets);
  });
};

// Get a single pet
exports.show = function (req, res) {
  Pet.findById(req.params.id, function (err, pet) {
    if (err) {
      return handleError(res, err);
    }
    if (!pet) {
      return res.status(404).send('Not Found');
    }
    return res.json(pet);
  });
};

// Creates a new pet in the DB.
exports.create = function (req, res) {
  if (req.user.organization) {
    req.body.organization = req.user.organization;
  }
  Pet.create(req.body, function (err, pet) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(pet);
  });
};

// Updates an existing pet in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if (req.user.organization && !req.user.organization.equals(req.body.organization)) {
    return res.status(403).send('Você não pode alterar um pet de outra organização');
  }
  Pet.findById(req.params.id, function (err, pet) {
    if (err) {
      return handleError(res, err);
    }
    if (!pet) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(pet, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(pet);
    });
  });
};

// Deletes a pet from the DB.
exports.destroy = function (req, res) {
  Pet.findById(req.params.id, function (err, pet) {
    if (err) {
      return handleError(res, err);
    }
    if (!pet) {
      return res.status(404).send('Not Found');
    }
    pet.delete(function (err) {
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
