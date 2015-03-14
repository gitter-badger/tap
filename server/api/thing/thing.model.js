'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

ThingSchema.plugin(require('mongoose-created-at'));
ThingSchema.plugin(require('mongoose-updated-at'));

module.exports = mongoose.model('Thing', ThingSchema);
