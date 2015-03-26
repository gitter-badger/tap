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
    $scope.petsFilter = {type: $scope.typeEnum[0].id};
    $scope.petsSort = $scope.sortEnum[0].id;
    $scope.breeds = [];

    $scope.updateBreeds = function (type) {
      $scope.breeds = Breed.query({type: type});
    };

    $scope.updateBreeds($scope.petsFilter.type);
  });
