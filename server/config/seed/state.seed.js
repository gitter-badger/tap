var Seeder = require('./seeder');
var State = require('./../../api/state/state.model');

var seeder = new Seeder(State);

seeder
  .add({
    name: "Santa Catarina",
    acronym: "SC"
  }, 'sc')
  .add({
    name: "São Paulo",
    acronym: "SP"
  }, 'sp');

module.exports = seeder;
