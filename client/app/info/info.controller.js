'use strict';

angular.module('tapApp')
  .controller('InfoCtrl', function ($scope, $stateParams) {
    $scope.type = $stateParams.type;
  });
