'use strict';

angular.module('tapApp')
  .controller('MainCtrl', function ($scope, Auth, $state) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.login = function () {
      $state.go('admin.dashboard');
    };
    $scope.logout = function () {
      Auth.logout();
      $state.go('main.home');
    };

    $scope.menuIsActive = function (states) {
      if (typeof states === 'string') {
        states = [states];
      }
      return states.indexOf($state.current.name) >= 0;
    };

  });
