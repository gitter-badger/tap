'use strict';

angular.module('tapApp')
  .controller('OrganizationUserCtrl', function ($scope, $controller, $stateParams, Organization, $state, User) {
    angular.extend(this, $controller('UserCtrl', {$scope: $scope}));
    $scope.users = User.queryAdmin({role: 'org'});
    $scope.organization = Organization.get({id: $stateParams.organization}, function () {
    }, function () {
      $state.go('admin.organization');
    });
    $scope.preSave = function (user) {
      user.role = 'org';
      user.organization = $scope.organization._id;
    };
  });
