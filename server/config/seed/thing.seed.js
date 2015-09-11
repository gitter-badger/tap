'use strict';

var Promise = require('bluebird');
var Thing = require('./../../api/thing/thing.model');
var async = require('async');

function thingSeeder() {

  var states = [{
    name: 'Awesome Thing',
    info: 'Create by Seed'
  }];

  return new Promise(function (fulfill, reject) {
    Thing.remove().exec(function () {
      async.map(states, function (item, done) {

        Thing.create(item, done);

      }, function (err, result) {
        if (err) {
          return reject(err);
        }

        return fulfill(result);
      });
    });
  });
}

module.exports = thingSeeder;
