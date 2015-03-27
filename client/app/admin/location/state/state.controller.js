'use strict';

angular.module('tapApp')
  .controller('StateCtrl', function ($scope, State, $stateParams, $location) {
    $scope.states = State.query();
    $scope.state = {};

    $scope.edit = function (state) {
      $scope.ui.loading();
      var stateId = (_.isObject(state)) ? state._id : state;
      $location.search('id', stateId);
      State.get({id: stateId}, function (state) {
        $scope.state = state;
        $scope.ui.loaded();
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.state = {};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        $scope.submitted = true;
        if ($scope.state._id) {
          $scope.update($scope.state);
          return;
        }
        $scope.create($scope.state, form);
      }
    };

    $scope.update = function (state) {
      $scope.ui.loading();
      state.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        var index = _.findIndex($scope.states, {_id: state._id});
        $scope.states.splice(index, 1, angular.copy(state));
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (stateNew, form) {
      $scope.ui.loading();
      State.save(stateNew, function (state) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.states.push(state);
        $location.search('id', state._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.delete = function (state, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        state.$delete(function () {
          $location.search('id', null);
          var index = _.findIndex($scope.states, {_id: state._id});
          $scope.states.splice(index, 1);
          if ($scope.state._id === state._id) {
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
