'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileFilterSchema = new Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  type: {type: String, required: true},
  width: Number,
  height: Number,
  filter: {type: String, required: true}
});

var FileSchema = new Schema({
  name: {type: String, required: true},
  url: {type: String, required: true, index: true},
  type: {type: String, required: true},
  active: {type: Boolean, default: true},
  width: Number,
  height: Number,
  filters: [FileFilterSchema],
  folder: {type: Schema.Types.ObjectId, ref: 'Folder', required: true, index: true}
});

/**
 * Plugins
 */
FileSchema.plugin(require('mongoose-created-at'));
FileSchema.plugin(require('mongoose-updated-at'));

// Public profile information
FileSchema
  .virtual('filterNamed')
  .get(function () {
    var filterNamed = {};
    this.filters.forEach(function (filter) {
      filterNamed[filter.filter] = filter;
    });
    return filterNamed;
  });

FileSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('File', FileSchema);
