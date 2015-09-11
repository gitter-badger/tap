'use strict';

var Promise = require('bluebird');
var Organization = require('./../../api/organization/organization.model');
var async = require('async');

function organizationSeeder(states, cities) {

  var organizations = [{
    name: 'Anjinhos Peludos',
    phone: 32631850,
    email: 'anjinhospeludos@gmail.com',
    address: {
      street: 'Rua ceará',
      number: 433,
      district: 'Universitário',
      city: cities[0],
      state: states[0],
      zipCode: 88200000
    },
    location: [-27.2446929, -48.7029251],
    info: 'Create By Seeder'
  }];

  return new Promise(function (fulfill, reject) {
    Organization.remove().exec().then(function () {
      async.map(organizations, function (item, done) {

        Organization.create(item, done);

      }, function (err, result) {
        if (err) {
          return reject(err);
        }

        return fulfill(result);
      });
    });
  });
}

module.exports = organizationSeeder;

