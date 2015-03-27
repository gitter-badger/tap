'use strict';

angular.module('tapApp')
  .controller('CityCtrl', function ($scope, City, $stateParams, $location, State) {
    $scope.cities = City.query();
    $scope.city = {};
    $scope.state = State.get({id: $stateParams.state});

    $scope.edit = function (city) {
      $scope.ui.loading();
      var cityId = (_.isObject(city)) ? city._id : city;
      $location.search('id', cityId);
      City.get({id: cityId}, function (city) {
        $scope.city = city;
        $scope.ui.loaded();
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.city = {};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        $scope.city.state = $scope.state._id;
        $scope.submitted = true;
        if ($scope.city._id) {
          $scope.update($scope.city);
          return;
        }
        $scope.create($scope.city, form);
      }
    };

    $scope.update = function (city) {
      $scope.ui.loading();
      city.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        var index = _.findIndex($scope.cities, {_id: city._id});
        $scope.cities.splice(index, 1, angular.copy(city));
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (cityNew, form) {
      $scope.ui.loading();
      City.save(cityNew, function (city) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.cities.push(city);
        $location.search('id', city._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.delete = function (city, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        city.$delete(function () {
          $location.search('id', null);
          var index = _.findIndex($scope.cities, {_id: city._id});
          $scope.cities.splice(index, 1);
          if ($scope.city._id === city._id) {
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
