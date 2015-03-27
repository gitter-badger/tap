'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../config/environment');
var gmFilters = require('./../../components/gm-filters');
var Diacritics = require('diacritic');
var slug = require('slug');

var PetSchema = new Schema({
  name: {type: String, required: true},
  nameNormalized: {type: String, lowercase: true, trim: true},
  nameSlug: {type: String, lowercase: true, trim: true},
  history: String,
  type: {
    type: String,
    required: true,
    enum: config.pet.enums.type,
    default: config.pet.enums.type[0],
    index: true
  },
  organization: {type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true},
  city: {type: Schema.Types.ObjectId, ref: 'City', required: true, index: true},
  state: {type: Schema.Types.ObjectId, ref: 'State', required: true, index: true},
  location: {
    index: '2dsphere',
    type: [Number],
    required: true
  },
  keywords: {type: String, lowercase: true, trim: true},
  profilePicture: gmFilters.createImageSchema(),
  images: [gmFilters.createImageSchema()],
  counts: {
    display: {type: Number, default: 0},
    like: {type: Number, default: 0}
  },
  size: {
    type: String,
    required: true,
    enum: config.pet.enums.size,
    default: config.pet.enums.size[0],
    index: true
  },
  gender: {
    type: String,
    required: true,
    enum: config.pet.enums.gender,
    default: config.pet.enums.gender[0],
    index: true
  },
  age: {
    type: String,
    required: true,
    enum: config.pet.enums.age,
    default: config.pet.enums.age[0],
    index: true
  },
  breeds: [{type: Schema.Types.ObjectId, ref: 'Breed', required: true, index: true}]
});

PetSchema.plugin(require('mongoose-created-at'));
PetSchema.plugin(require('mongoose-updated-at'));
PetSchema.plugin(require('mongoose-delete'));

/**
 * Pre-save hook
 */
PetSchema
  .pre('save', function (next) {
    this.nameNormalized = Diacritics.clean(this.name);
    this.nameSlug = slug(this.name);
    next();
  });

module.exports = mongoose.model('Pet', PetSchema);
