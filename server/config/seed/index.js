var Promise = require('bluebird');
var stateSeeder = require('./state.seed');
var citySeeder = require('./city.seed');
var thingSeeder = require('./thing.seed');
var organizationSeeder = require('./organization.seed');


var stateSeed = stateSeeder();
var citySeed = stateSeed.then(function (states) {
  return citySeeder(states);
});
var thingSeed = thingSeeder();
var organizationSeed = Promise.join(stateSeed, citySeed, function (states, cities) {
  return organizationSeeder(states, cities);
});


var seeders = [thingSeed, citySeed, stateSeed, organizationSeed];
seeders.push(function () {
  console.log('Seed concluído');
});

Promise.join.apply({}, seeders);
