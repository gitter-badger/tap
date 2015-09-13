'use strict';

var _ = require('lodash');
var Pet = require('./pet.model');
var Diacritics = require('diacritic');

// Get list of pets
exports.index = function (req, res) {
  var buildQuery = function (query) {
    query.where('deleted').equals(false);
    if (String(req.query.populateBreeds) === 'true') {
      query.populate('breeds', '_id name');
    }
    if (String(req.query.populateOrganization) === 'true') {
      query.populate('organization', '_id name address.city address.state');
    }
    if (req.query.name) {
      query.where('nameNormalized').equals(new RegExp(Diacritics.clean(req.query.name), 'i'));
    }
    if (req.query.organization) {
      query.where('organization').equals(req.query.organization);
    }
    if (req.query.type) {
      query.where('type').equals(req.query.type);
    }
    if (req.query.size) {
      query.where('size').equals(req.query.size);
    }
    if (req.query.gender) {
      query.where('gender').equals(req.query.gender);
    }
    if (req.query.age) {
      query.where('age').equals(req.query.age);
    }
    if (req.query.breeds) {
      var breeds = (_.isArray(req.query.breeds)) ? req.query.breeds : [req.query.breeds];
      var breedsCondition = [];
      breeds.forEach(function (breed) {
        breedsCondition.push({breeds: breed});
      });
      query.and([{$or: breedsCondition}]);
    }
    return query;
  };
  var query = buildQuery(Pet.find());
  var countQuery = buildQuery(Pet.find());
  countQuery.count(function (err, count) {
    if (err) {
      return handleError(res, err);
    }
    if (!req.query.limit || req.query.limit > 100) {
      req.query.limit = 20;
    }

    query.paginate(req.query.page || 1, req.query.limit);
    query.sort(req.query.sort || '-createdAt');
    query.exec(function (err, pets) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json({
        page: req.query.page,
        count: count,
        countByPage: pets.length,
        resources: pets
      });
    });
  });
};

// Get a single pet
exports.show = function (req, res) {
  Pet.findOne({_id: req.params.id, deleted: false}, function (err, pet) {
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
    updated.images = [];
    req.body.images.forEach(function (image) {
      updated.images.push(image);
    });
    updated.markModified('images');
    updated.save(function (err, saved) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(saved);
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
    if (req.user.organization && req.user.organization.equals(pet.organization)) {
      return res.status(403).send('Você não pode deletar um pet de outra organização');
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
