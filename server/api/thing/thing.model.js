'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String
});

ThingSchema.plugin(require('mongoose-created-at'));
ThingSchema.plugin(require('mongoose-updated-at'));
ThingSchema.plugin(require('mongoose-delete'));

module.exports = mongoose.model('Thing', ThingSchema);
