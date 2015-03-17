'use strict';

angular.module('tapApp')
  .controller('InfoCtrl', function ($scope, $stateParams, $state, $location) {
    $scope.type = $stateParams.type;
  });
