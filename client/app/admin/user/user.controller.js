'use strict';

angular.module('tapApp')
  .controller('UserCtrl', function ($scope, User, $stateParams, $location) {
    $scope.users = User.query({controller: 'admin'});
    $scope.user = {};
    $scope.errors = {};

    $scope.edit = function (user) {
      $scope.ui.loading();
      var userId = (_.isObject(user)) ? user._id : user;
      $location.search('id', userId);
      User.get({id: userId}, function (user) {
        $scope.user = user;
        $scope.ui.loaded();
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.user = {};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        $scope.submitted = true;
        if ($scope.user._id) {
          $scope.update($scope.user);
          return;
        }
        $scope.create($scope.user, form);
      }
    };

    $scope.update = function (user) {
      $scope.ui.loading();
      user.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        var index = _.findIndex($scope.users, {_id: user._id});
        $scope.users.splice(index, 1, angular.copy(user));
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (userNew, form) {
      $scope.ui.loading();
      User.save(userNew, function (user) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.users.push(user);
        $location.search('id', user._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        err = err.data;
        $scope.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });
    };

    $scope.delete = function (user, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        user.$delete(function () {
          $location.search('id', null);
          var index = _.findIndex($scope.users, {_id: user._id});
          $scope.users.splice(index, 1);
          if ($scope.user._id === user._id) {
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
