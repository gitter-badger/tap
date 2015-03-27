'use strict';

var gm = require('gm').subClass({imageMagick: true});

function imageSchema() {
  return {
    url: String,
    width: Number,
    height: Number,
    filters: {
      thumb: {
        url: String,
        width: Number,
        height: Number
      },
      maxHeight: {
        url: String,
        width: Number,
        height: Number
      },
      maxWidth: {
        url: String,
        width: Number,
        height: Number
      }
    }
  };
}

function filters() {
  return [{
    name: 'thumb',
    size: function (file, cb) {
      return cb(null, {width: 300, height: 300});
    },
    filter: function (file, cb) {
      gm(file.path)
        .gravity('Center')
        .resize('300', '300' + "^")
        .thumbnail('300', '300' + '^')
        .extent('300', '300')
        .quality(80)
        .stream(function (err, stdout, stderr) {
          if (err) {
            return cb(err);
          }
          return cb(err, stdout, stderr);
        });
    }
  }, {
    name: 'maxHeight',
    size: function (file, cb) {
      gm(file.path)
        .resize(null, '800')
        .quality(80)
        .stream(function (err, stdout, stderr) {
          if (err) {
            return cb(err);
          }
          gm(stdout).size(function (err, size) {
            if (err) {
              return cb(err);
            }
            return cb(err, size);
          });
        });

    },
    filter: function (file, cb) {
      gm(file.path)
        .resize(null, '800')
        .quality(80)
        .stream(function (err, stdout, stderr) {
          if (err) {
            return cb(err);
          }
          return cb(err, stdout, stderr);
        });
    }
  }, {
    name: 'maxWidth',
    size: function (file, cb) {
      gm(file.path)
        .resize('400', null)
        .quality(80)
        .stream(function (err, stdout, stderr) {
          if (err) {
            return cb(err);
          }
          gm(stdout).size(function (err, size) {
            if (err) {
              return cb(err);
            }
            return cb(err, size);
          });
        });

    },
    filter: function (file, cb) {
      gm(file.path)
        .resize('400', null)
        .quality(80)
        .stream(function (err, stdout, stderr) {
          if (err) {
            return cb(err);
          }
          return cb(err, stdout, stderr);
        });
    }
  }];
}

exports.createImageSchema = imageSchema;
exports.getFilters = filters;
