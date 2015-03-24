'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config/environment');

var BreedSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true, enum: config.pet.types, default: config.pet.default, index: true}
});

BreedSchema.plugin(require('mongoose-created-at'));
BreedSchema.plugin(require('mongoose-updated-at'));
BreedSchema.plugin(require('mongoose-delete'));

module.exports = mongoose.model('Breed', BreedSchema);
