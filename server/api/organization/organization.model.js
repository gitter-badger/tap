'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: Number, required: true},
  email: {type: String, required: true},
  address: {
    street: {type: String, required: true},
    number: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: Number, required: true},
    complement: {type: String}
  },
  location: {
    index: '2dsphere',
    type: [Number],
    required: true
  },
  info: String
});

OrganizationSchema.plugin(require('mongoose-created-at'));
OrganizationSchema.plugin(require('mongoose-updated-at'));
OrganizationSchema.plugin(require('mongoose-delete'));

module.exports = mongoose.model('Organization', OrganizationSchema);
