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
      city: new SeedRef(City, "São João Batista"),
      state: new SeedRef(State, "SC"),
      zipCode: "88240000"
    },
    location: [798789, 78978987]
  }, "Organização teste");

//name: {type: String, required: true},
//phone: {type: Number, required: true},
//email: {type: String, required: true},
//address: {
//  street: {type: String, required: true},
//  number: {type: String, required: true},
//  district: {type: String, required: true},
//  city: {type: Schema.Types.ObjectId, ref: 'City', required: true, index: true},
//  state: {type: Schema.Types.ObjectId, ref: 'State', required: true, index: true},
//  zipCode: {type: Number, required: true},
//  complement: {type: String},
//  asString: {type: String}
//},
//location: {
//  index: '2dsphere',
//    type: [Number],
//    required: true
//},
//info: String
//

module.exports = seeder;
