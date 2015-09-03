var Seeder = require('./seeder');
var SeedRef = require('./seed-ref');
var Organization = require('./../../api/organization/organization.model');

var State = require('./../../api/state/state.model');
var City = require('./../../api/city/city.model');

var seeder = new Seeder(Organization);

seeder.add({
    name: "Organização teste",
    phone: "4899675405",
    email: "tatosjb@gmail.com",
    address: {
      street: "Rua teste",
      number: "0123",
      district: "Centro",
      city: new SeedRef(City, "4681"),
      state: new SeedRef(State, "SC"),
      zipCode: "88240000"
    },
    location: [798789, 78978987]
  }, "Organização teste");

module.exports = seeder;
