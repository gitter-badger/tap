'use strict';

angular.module('tapApp')
  .controller('AdminCtrl', function ($scope, Auth, $state, UI) {
    $scope.ui = UI;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.hasRole = Auth.hasRole;
    $scope.getCurrentUser = Auth.getCurrentUser;
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
