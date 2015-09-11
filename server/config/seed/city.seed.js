'use strict';

var Promise = require('bluebird');
var City = require('./../../api/city/city.model');
var async = require('async');

function citySeeder(states) {

  var cities = [{
    name: 'Tijucas',
    state: states[0]
  }];

  return new Promise(function (fulfill, reject) {
    City.remove().exec().then(function () {
      async.map(cities, function (item, done) {

        City.create(item, done);

      }, function (err, result) {
        if(err){
          return reject(err);
        }

        return fulfill(result);
      });
    });
  });
}

module.exports = citySeeder;

