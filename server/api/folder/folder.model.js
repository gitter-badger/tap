'use strict';

var NestedSetPlugin = require('mongoose-nested-set');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FolderSchema = new Schema({
  name: {type: String, required: true},
  active: {type: Boolean, default: true},
  root: {type: Boolean, default: false}
});

/**
 * Plugins
 */
FolderSchema.plugin(NestedSetPlugin);
FolderSchema.plugin(require('mongoose-created-at'));
FolderSchema.plugin(require('mongoose-updated-at'));

/**
 * Static Methods
 */
FolderSchema.statics.findRoot = function (cb) {
  var self = this;
  this.findOne({name: 'root', root: true}, function (err, root) {
    if (err) {
      return cb(err);
    }
    if (root) {
      return cb(err, root);
    }
    self.create({
      name: 'root',
      root: true
    }, cb);
  });
};

module.exports = mongoose.model('Folder', FolderSchema);
