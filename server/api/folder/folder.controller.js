'use strict';

var _ = require('lodash');
var Folder = require('./folder.model');

// Get list of folders
exports.index = function (req, res) {
  Folder.findRoot(function (err, root) {
    if (err) {
      return handleError(res, err);
    }
    Folder.rebuildTree(root, 1, function () {
      root.descendants(function (err, data) {
        if (err) {
          return handleError(res, err);
        }
        return res.json(data);
      });
    });
  });
};

// Get a single folder
exports.show = function (req, res) {
  Folder.findById(req.params.id, function (err, folder) {
    if (err) {
      return handleError(res, err);
    }
    if (!folder) {
      return res.send(404);
    }
    return res.json(folder);
  });
};

// Creates a new folder in the DB.
exports.create = function (req, res) {
  Folder.findRoot(function (err, root) {
    if (!req.body.parentId) {
      req.body.parentId = root._id;
    }
    Folder.create(req.body, function (err, media) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, media);
    });
  });
};

// Updates an existing folder in the DB.
exports.update = function (req, res) {
  Folder.findRoot(function (err, root) {
    var changes = {
      name: req.body.name,
      parentId: req.body.parentId
    };
    Folder.findById(req.params.id, function (err, folder) {
      if (err) {
        return handleError(res, err);
      }
      if (folder._id.equals(changes.parentId)) {
        delete changes.parentId;
      }
      if (!changes.parentId) {
        changes.parentId = root._id;
      }
      if (!folder) {
        return res.send(404);
      }
      var updated = _.merge(folder, changes);
      updated.save(function (err) {
        if (err) {
          return handleError(res, err);
        }
        return res.json(200, folder);
      });
    });
  });
};

// Deletes a folder from the DB.
exports.destroy = function (req, res) {
  Folder.findRoot(function (err, root) {
    if (root._id.equals(req.params.id)) {
      return res.send(400);
    }
    Folder.findById(req.params.id, function (err, folder) {
      if (err) {
        return handleError(res, err);
      }
      if (!folder) {
        return res.send(404);
      }
      folder.parent(function (err, parent) {
        if (err) {
          return handleError(res, err);
        }
        folder.children(function (err, subfolders) {
          if (err) {
            return handleError(res, err);
          }
          folder.remove(function (err) {
            if (err) {
              return handleError(res, err);
            }
            var count = 0;
            if (subfolders.length === 0) {
              return res.send(204);
            }
            subfolders.forEach(function (folder) {
              folder.parentId = parent._id;
              folder.save(function () {
                count++;
                if (subfolders.length === count) {
                  return res.send(204);
                }
              });
            });
          });
        });
      });
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
