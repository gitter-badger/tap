'use strict';

angular.module('tapApp')
  .factory('FileUpload', function ($upload) {
    var uploadProgress = [];
    var uploading = false;

    return {
      upload: function (newFiles, fields, cbFile, cbDone) {
        if (uploading) {
          return;
        }
        if (!cbFile) {
          cbFile = angular.noop;
        }
        if (!cbDone) {
          cbDone = angular.noop;
        }
        if (newFiles && newFiles.length) {
          uploading = true;
          uploadProgress = newFiles.slice();
          async.eachSeries(uploadProgress, function (file, next) {
            $upload.upload({
              url: '/api/files/',
              fields: fields,
              file: file
            }).progress(function (evt) {
              file.progress = parseInt(100.0 * evt.loaded / evt.total);
            }).error(function (err) {
              file.error = 'Erro ao enviar';
              cbFile({err: err, msg: 'Erro ao enviar'}, file);
              next();
            }).success(function (savedFile) {
              file.success = 'Enviado com sucesso!';
              uploading = false;
              cbFile(null, savedFile);
              next();
            });
          }, function () {
            uploadProgress = [];
            cbDone();
          });
        }
      },
      progress: function () {
        return uploadProgress;
      }
    };
  });
