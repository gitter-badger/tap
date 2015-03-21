'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var validationError = function (res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 */
exports.index = function (req, res) {
  var query = User.find({active: true, role: 'user'}, '_id name picture');
  if (req.query.place) {
    query.where('place').equals(req.query.place);
  }
  query.exec(function (err, users) {
    if (err)
      return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.indexAdmin = function (req, res) {
  var query = User.find({role: req.query.role || 'admin'}, '-salt -hashedPassword');
  query.exec(function (err, users) {
    if (err)
      return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function (err, user) {
    if (err)
      return validationError(res, err);
    var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
    res.json({token: token});
  });
};

/**
 * Create new user. Created by another admin
 */
exports.createAdmin = function (req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  if (!newUser.role) {
    newUser.role = 'admin';
  }
  newUser.save(function (err, user) {
    if (err) {
      return validationError(res, err);
    }
    return res.json(201, user);
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err)
      return next(err);
    if (!user)
      return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Get a single user for admin
 */
exports.showAdmin = function (req, res, next) {
  var userId = req.params.id;

  User.findOne({_id: userId}, '-salt -hashedPassword', function (err, user) {
    if (err)
      return next(err);
    if (!user)
      return res.send(401);
    res.json(user);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return res.send(500, err);
    }
    if (user.email === req.user.email) {
      return res.send(400);
    }
    if (user.email === config.admin.email) {
      return res.send(403);
    }
    User.remove({_id: user._id}, function (err) {
      if (err) {
        return res.send(500, err);
      }
      return res.send(204);
    });
  });
};

// Updates an existing user in the DB.
exports.updateAdmin = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      return handleError(res, err);
    }
    if (user.email === config.admin.email) {
      return res.send(403);
    }
    if (!user) {
      return res.send(404);
    }
    var updated = _.merge(user, {
      email: req.body.email,
      name: req.body.name
    });
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, user);
    });
  });
};


/**
 * Change a users password
 */
exports.changePassword = function (req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function (err) {
        if (err)
          return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function (err, user) { // don't ever give out the password or salt
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(401);
    }
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
  res.redirect('/');
};


function handleError(res, err) {
  return res.send(500, err);
}
