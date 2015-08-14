var Seeder = require('./seeder');
var SeedRef = require('./seed-ref');
var City = require('./../../api/city/city.model');
var State = require('./../../api/state/state.model');


var seeder = new Seeder(City);

seeder
  .add({
    name: "Tijucas :-)",
    state: new SeedRef(State, 'sc')
  })
  .add({
    name: "São Paulo",
    state: new SeedRef(State, 'sp')
  });

module.exports = seeder;
