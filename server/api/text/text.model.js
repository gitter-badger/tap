'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TextSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  type: {type: String, required: true, enum: ['about', 'termsOfService', 'privacyPolicy'], unique: true},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Text', TextSchema);
