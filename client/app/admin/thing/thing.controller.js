'use strict';

angular.module('tapApp')
  .controller('ThingCtrl', function ($scope, Thing, $stateParams, $location) {
    $scope.things = Thing.query();
    $scope.thing = {};

    $scope.edit = function (thing) {
      $scope.ui.loading();
      var thingId = (_.isObject(thing)) ? thing._id : thing;
      $location.search('id', thingId);
      Thing.get({id: thingId}, function (thing) {
        $scope.thing = thing;
        $scope.ui.loaded();
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.thing = {};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        $scope.submitted = true;
        if ($scope.thing._id) {
          $scope.update($scope.thing);
          return;
        }
        $scope.create($scope.thing, form);
      }
    };

    $scope.update = function (thing) {
      $scope.ui.loading();
      thing.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        var index = _.findIndex($scope.things, {_id: thing._id});
        $scope.things.splice(index, 1, angular.copy(thing));
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (thingNew, form) {
      $scope.ui.loading();
      Thing.save(thingNew, function (thing) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.things.push(thing);
        $location.search('id', thing._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.delete = function (thing, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        thing.$delete(function () {
          $location.search('id', null);
          var index = _.findIndex($scope.things, {_id: thing._id});
          $scope.things.splice(index, 1);
          if ($scope.thing._id === thing._id) {
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
