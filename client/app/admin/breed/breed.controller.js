'use strict';

angular.module('tapApp')
  .controller('BreedCtrl', function ($scope, Breed, $stateParams, $location, ENUM) {
    $scope.breeds = Breed.query();
    $scope.breed = {};
    $scope.typeEnum = ENUM.get('petType');

    $scope.edit = function (breed) {
      $scope.ui.loading();
      var breedId = (_.isObject(breed)) ? breed._id : breed;
      $location.search('id', breedId);
      Breed.get({id: breedId}, function (breed) {
        $scope.breed = breed;
        $scope.ui.loaded();
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.breed = {};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        $scope.submitted = true;
        if ($scope.breed._id) {
          $scope.update($scope.breed);
          return;
        }
        $scope.create($scope.breed, form);
      }
    };

    $scope.update = function (breed) {
      $scope.ui.loading();
      breed.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        var index = _.findIndex($scope.breeds, {_id: breed._id});
        $scope.breeds.splice(index, 1, angular.copy(breed));
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (breedNew, form) {
      $scope.ui.loading();
      Breed.save(breedNew, function (breed) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.breeds.push(breed);
        $location.search('id', breed._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.delete = function (breed, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        breed.$delete(function () {
          $location.search('id', null);
          var index = _.findIndex($scope.breeds, {_id: breed._id});
          $scope.breeds.splice(index, 1);
          if ($scope.breed._id === breed._id) {
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
