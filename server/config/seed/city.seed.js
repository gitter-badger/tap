var Seeder = require('./seeder');
var SeedRef = require('./seed-ref');
var cities = require('./list-of-cities');

var City = require('./../../api/city/city.model');
var State = require('./../../api/state/state.model');

var seeder = new Seeder(City);

cities.forEach(function(city){
  var cityInfos = city.split(",");
  seeder.add({
    name: cityInfos[3],
    state: new SeedRef(State, cityInfos[4].toUpperCase())
  }, cityInfos[0]);
});

module.exports = seeder;
