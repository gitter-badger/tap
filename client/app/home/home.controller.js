'use strict';

angular.module('tapApp')
  .controller('HomeCtrl', function ($scope, Pet, $stateParams, $location, ENUM, Breed) {
    $scope.sortEnum = ENUM.get('petSort');
    $scope.typeEnum = ENUM.get('petType');
    $scope.sizeEnum = ENUM.get('petSize');
    $scope.ageEnum = ENUM.get('petAge');
    $scope.genderEnum = ENUM.get('petGender');
    $scope.pets = [];
    $scope.petsCount = 0;
    $scope.petsLoader = false;
    $scope.petsFilter = {type: $scope.typeEnum[0].id};
    $scope.petsSort = $scope.sortEnum[0].id;
    $scope.breeds = [];
    $scope.petsPage = 1;

    $scope.updateBreeds = function (type) {
      $scope.breeds = Breed.query({type: type});
    };

    $scope.loadPets = function (currentPage) {
      $scope.petsLoader = true;
      Pet.query(_.merge({
        page: currentPage,
        limit: 20,
        sort: $scope.petsSort,
        populateBreeds: true,
        populateOrganization: true
      }, $scope.petsFilter), function (response) {
        $scope.pets = response.resources;
        $scope.petsCount = response.count;
        $scope.petsLoader = false;
      }, function (err) {
        $scope.petsLoader = false;
        $scope.ui.alert('Não foi possível carregar os pets, tente mais tarde!', 'info');
        console.log(err);
      });
    };

    $scope.loadPets($scope.petsPage);
    $scope.updateBreeds($scope.petsFilter.type);
  });
