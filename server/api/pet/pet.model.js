'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config/environment');

var PetSchema = new Schema({
  name: {type: String, required: true},
  history: String,
  type: {type: String, required: true, enum: config.pet.types, default: config.pet.default, index: true},
  organization: {type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true},
  breed: {}
});

PetSchema.plugin(require('mongoose-created-at'));
PetSchema.plugin(require('mongoose-updated-at'));
PetSchema.plugin(require('mongoose-delete'));

module.exports = mongoose.model('Pet', PetSchema);
