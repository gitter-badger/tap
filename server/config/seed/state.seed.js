'use strict';

var Promise = require('bluebird');
var State = require('./../../api/state/state.model');
var async = require('async');

function stateSeeder() {

  var states = [{
    name: 'Santa Catarina',
    acronym: 'SC'
  }];

  return new Promise(function (fulfill, reject) {
    State.remove().exec(function () {
      async.map(states, function (item, done) {

        State.create(item, done);

      }, function (err, result) {
        if (err) {
          return reject(err);
        }

        return fulfill(result);
      });
    });
  });
}

module.exports = stateSeeder;
