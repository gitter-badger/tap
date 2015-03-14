'use strict';

angular.module('tapApp')
  .controller('TextCtrl', function ($scope, Text, $stateParams, $location) {
    $scope.texts = Text.query();
    $scope.text = {};
    $scope.typeEnum = [{
      label: 'Contato',
      id: 'contact'
    }, {
      label: 'Sobre mim',
      id: 'about'
    }];

    $scope.edit = function (text) {
      $scope.ui.loading();
      var textId = (_.isObject(text)) ? text._id : text;
      $location.search('id', textId);
      Text.get({id: textId}, function (text) {
        $scope.text = text;
        $scope.ui.loaded();
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.text = {};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        var index = _.findIndex($scope.texts, function (text) {
          return text.type === $scope.text.type && text._id !== $scope.text._id;
        });
        if (index >= 0) {
          $scope.ui.alert('O tipo de dexto já está em uso', 'info');
          return;
        }
        $scope.submitted = true;
        if ($scope.text._id) {
          $scope.update($scope.text);
          return;
        }
        $scope.create($scope.text, form);
      }
    };

    $scope.update = function (text) {
      $scope.ui.loading();
      text.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        var index = _.findIndex($scope.texts, {_id: text._id});
        $scope.texts.splice(index, 1, angular.copy(text));
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (textNew, form) {
      $scope.ui.loading();
      Text.save(textNew, function (text) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.texts.push(text);
        $location.search('id', text._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.delete = function (text, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        text.$delete(function () {
          $location.search('id', null);
          var index = _.findIndex($scope.texts, {_id: text._id});
          $scope.texts.splice(index, 1);
          if ($scope.text._id === text._id) {
            $scope.clear(form);
          }
          $scope.ui.alert('Deletado com sucesso!', 'success');
        }, function (err) {
          $scope.ui.alert('Não foi possível deletar o registro!', 'danger');
          console.log(err);
        });
      });
    };

    if ($stateParams.id) {
      $scope.edit($stateParams.id);
    }
  });
