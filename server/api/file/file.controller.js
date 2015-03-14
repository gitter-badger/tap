'use strict';

var _ = require('lodash');
var File = require('./file.model');
var Folder = require('./../folder/folder.model');
var AWS = require('aws-sdk');
var config = require('../../config/environment');
var fs = require('fs');
AWS.config.update({accessKeyId: config.aws.id, secretAccessKey: config.aws.secret});
var s3Stream = require('s3-upload-stream')(new AWS.S3());
var gm = require('gm').subClass({imageMagick: true});
var async = require('async');
var gmFilters = require('./../../components/gm-filters');

// Get list of files
exports.index = function (req, res) {
  var query = File.find({active: true});
  if (req.query.folder) {
    query.where('folder').equals(req.query.folder);
  }
  query.sort('-createdAt');
  query.exec(function (err, files) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, files);
  });
};

// Get a single file
exports.show = function (req, res) {
  File.findById(req.params.id, function (err, file) {
    if (err) {
      return handleError(res, err);
    }
    if (!file) {
      return res.send(404);
    }
    return res.json(file);
  });
};

// Creates a new file in the DB.
exports.create = function (req, res) {
  var upload = function (folder) {
    if (!folder) {
      return res.send(404);
    }
    var reqFile = req.files.file;
    var newFile = {
      name: reqFile.name,
      type: reqFile.type,
      folder: folder._id,
      filters: []
    };
    async.eachSeries(gmFilters.getFilters(), function (filter, next) {
      filter.size(reqFile, function (err, size) {
        if (err) {
          next(err);
        }
        filter.filter(reqFile, function (err, stdout, stderr) {
          if (err) {
            next(err);
          }
          var upload = createUploader(filter.name + '-' + reqFile.name);
          upload.on('error', function (err) {
            next(err);
          });
          upload.on('uploaded', function (details) {
            newFile.filters.push({
              name: filter.name + '-' + reqFile.name,
              url: details.Location,
              type: reqFile.type,
              width: size.width,
              height: size.height,
              filter: filter.name
            });
            next();
          });
          stdout.pipe(upload);
        });
      })
    }, function (err) {
      if (err) {
        return handleError(res, err);
      }
      var read = fs.createReadStream(reqFile.path);
      var upload = createUploader(reqFile.name);
      upload.on('error', function (err) {
        return handleError(res, err);
      });
      upload.on('uploaded', function (details) {
        gm(reqFile.path).size(function (err, size) {
          if (err) {
            return handleError(res, err);
          }
          newFile.url = details.Location;
          newFile.width = size.width;
          newFile.height = size.height;
          File.create(newFile, function (err, savedFile) {
            if (err) {
              return handleError(res, err);
            }
            fs.unlink(reqFile.path);
            return res.json(savedFile);

          });
        });
      });
      read.pipe(upload);
    });
  };
  if (req.body.folder) {
    Folder.findById(req.body.folder, function (err, folder) {
      if (err) {
        return handleError(res, err);
      }
      if (!folder) {
        return res.send(404);
      }
      upload(folder);
    });
  } else {
    Folder.findRoot(function (err, root) {
      if (err) {
        return handleError(res, err);
      }
      upload(root);
    })
  }
};

// Deletes a file from the DB.
exports.destroy = function (req, res) {
  File.findById(req.params.id, function (err, file) {
    if (err) {
      return handleError(res, err);
    }
    if (!file) {
      return res.send(404);
    }
    file.active = false;
    file.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};


function createUploader(fileName) {
  var upload = s3Stream.upload({
    Bucket: config.aws.s3.bucket,
    Key: config.aws.s3.prefixKey + new Date().getTime() + '-' + fileName,
    ACL: "public-read",
    StorageClass: "REDUCED_REDUNDANCY",
    ContentType: "binary/octet-stream"
  });
  upload.maxPartSize(20971520); // 20 MB
  upload.concurrentParts(5);
  return upload;
}

function handleError(res, err) {
  return res.send(500, err);
}
