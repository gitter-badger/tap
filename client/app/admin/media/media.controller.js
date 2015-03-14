'use strict';

angular.module('tapApp')
  .controller('MediaCtrl', function ($scope, File, Folder, $location, $stateParams, FileUpload) {
    $scope.treedata = [];
    $scope.folder = {};
    $scope.files = [];
    $scope.newFiles = {};
    $scope.uploadProgress = FileUpload.progress;
    $scope.folders = Folder.query(function () {
      $scope.treedata = $scope.getTreedata($scope.folders);
    });

    $scope.editFolder = function (folder) {
      $scope.ui.loading();
      var folderId = (_.isObject(folder)) ? folder._id : folder;
      $location.search('id', folderId);
      Folder.get({id: folderId}, function (folder) {
        $scope.folder = folder;
        File.query({folder: folder._id}, function (files) {
          $scope.files = files;
          $scope.ui.loaded();
        }, function (err) {
          $scope.ui.alert('Erro ao carregaro os arquivos', 'danger');
          $scope.ui.loaded();
          console.log(err);
        });
      }, function (err) {
        $scope.ui.alert('Erro ao carregar a pasta', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clearFolder = function (form) {
      $scope.folder = {};
      $scope.files = [];
      $location.search('id', null);
      if (form) {
        form.$setPristine();
      }
    };

    $scope.saveFolder = function (form) {
      if (form.$valid) {
        $scope.submitted = true;
        if ($scope.folder._id) {
          $scope.updateFolder($scope.folder);
          return;
        }
        $scope.createFolder($scope.folder, form);
      }
    };

    $scope.updateFolder = function (folder) {
      $scope.ui.loading();
      folder.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.folder = folder;
        var index = _.findIndex($scope.folders, {_id: folder._id});
        $scope.folders.splice(index, 1, angular.copy(folder));
        $scope.treedata = $scope.getTreedata($scope.folders);
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.createFolder = function (folderNew, form) {
      $scope.ui.loading();
      Folder.save(folderNew, function (folder) {
        $scope.clearFolder(form);
        $scope.submitted = false;
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.ui.loaded();
        $scope.folders.push(folder);
        $scope.treedata = $scope.getTreedata($scope.folders);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.deleteFolder = function (folder) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        folder.$delete(function () {
          if (folder._id === $scope.folder._id) {
            $location.search('id', null);
            $scope.files = {};
            $scope.clearFolder();
          }
          $scope.folders = Folder.query(function () {
            $scope.treedata = $scope.getTreedata($scope.folders);
          });
          $scope.ui.alert('Deletado com sucesso!', 'success');
        }, function (err) {
          $scope.ui.alert('Não foi possível deletar o registro!', 'danger');
          console.log(err);
        });
      });
    };

    $scope.saveFiles = function (form, newFiles) {
      if (form.$valid) {
        FileUpload.upload(newFiles, {'folder': $scope.folder._id}, function (err, file) {
          if (err) {
            return;
          }
          $scope.files.unshift(file);
        }, function () {
          $scope.ui.alert('Upload concluído com sucesso!', 'success');
        });
        $scope.newFiles = {};
        form.$setPristine();
      }
    };

    $scope.deleteFile = function (file) {
      file.removing = true;
      File.delete({id: file._id}, function () {
        $scope.ui.alert('Arquivo removido com sucesso!', 'success');
        var index = _.findIndex($scope.files, {_id: file._id});
        $scope.files.splice(index, 1);
      }, function () {
        $scope.ui.alert('Não foi possível remover o arquivo!', 'danger');
        file.removing = false;
      });
    };

    $scope.getChields = function (folders, id) {
      var chieldren = _.filter(folders, {parentId: id});
      angular.forEach(chieldren, function (folder) {
        _.remove(folders, {_id: folder._id});
      });
      return chieldren;
    };

    $scope.getTreedata = function (folders) {
      var f = folders.slice();
      angular.forEach(f.slice(), function (folder) {
        folder.children = $scope.getChields(f, folder._id);
      });
      return f;
    };

    if ($stateParams.id) {
      $scope.editFolder($stateParams.id);
    }
  });
