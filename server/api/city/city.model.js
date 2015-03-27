'use strict';

var Diacritics = require('diacritic');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');
var gmFilters = require('./../../components/gm-filters');

var CitySchema = new Schema({
  name: {type: String, require: true},
  nameNormalized: {type: String, lowercase: true, trim: true, index: true},
  nameSlug: {type: String, lowercase: true, trim: true, unique: true},
  info: String,
  published: {type: Boolean, default: false},
  state: {type: Schema.Types.ObjectId, ref: 'State', require: true, index: true}
});

/**
 * Plugins
 */
CitySchema.plugin(require('mongoose-created-at'));
CitySchema.plugin(require('mongoose-updated-at'));
CitySchema.plugin(require('mongoose-delete'));

/**
 * Pre-save hook
 */
CitySchema
  .pre('save', true, function (next, done) {
    next();
    this.nameNormalized = Diacritics.clean(this.name);
    var self = this;
    this.populate('state', function () {
      self.nameSlug = slug(self.name.trim() + ' ' + self.state.acronym.trim());
      done();
    });
  });

module.exports = mongoose.model('City', CitySchema);
