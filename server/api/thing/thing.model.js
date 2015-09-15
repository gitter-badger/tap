'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: {type: String, required: true, min: 5},
  info: String
});

ThingSchema.path('name').validate(function (name) {
  if(!name) return true;

  return name.length > 5;
}, 'Name longer than 5 characters');

ThingSchema.plugin(require('mongoose-created-at'));
ThingSchema.plugin(require('mongoose-updated-at'));
ThingSchema.plugin(require('mongoose-delete'));

module.exports = mongoose.model('Thing', ThingSchema);
