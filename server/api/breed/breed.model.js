'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config/environment');
var slug = require('slug');

var BreedSchema = new Schema({
  name: {type: String, required: true},
  nameSlug: {type: String, lowercase: true, trim: true, unique: true},
  type: {type: String, required: true, enum: config.pet.enums.type, default: config.pet.enums.type[0], index: true}
});

BreedSchema.plugin(require('mongoose-created-at'));
BreedSchema.plugin(require('mongoose-updated-at'));
BreedSchema.plugin(require('mongoose-delete'));

/**
 * Pre-save hook
 */
BreedSchema
  .pre('save', function (next) {
    this.nameSlug = slug(this.type + ' ' + this.name);
    next();
  });


module.exports = mongoose.model('Breed', BreedSchema);
