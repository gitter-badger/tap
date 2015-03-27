'use strict';

var Diacritics = require('diacritic');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateSchema = new Schema({
  name: {type: String, require: true},
  nameNormalized: {type: String, lowercase: true, trim: true, index: true},
  info: String,
  published: {type: Boolean, default: false},
  acronym: {type: String, require: true, unique: true}
});

/**
 * Plugins
 */
StateSchema.plugin(require('mongoose-created-at'));
StateSchema.plugin(require('mongoose-updated-at'));
StateSchema.plugin(require('mongoose-delete'));

/**
 * Pre-save hook
 */
StateSchema
  .pre('save', function (next) {
    this.nameNormalized = Diacritics.clean(this.name);
    next();
  });

module.exports = mongoose.model('State', StateSchema);
