'use strict';

angular.module('tapApp')
  .controller('MainCtrl', function ($scope, Auth, $state, $location, LoginModal, Text) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.texts = Text.queryByType();
    $scope.login = function () {
      LoginModal.open();
    };
    $scope.logout = function () {
      Auth.logout();
      $state.go('main.home');
    };

    $scope.goInfo = function (type) {
      if ($state.current.name === 'main.info') {
        $location.search('type', type);
      } else {
        $state.go('main.info', {type: type});
      }
    };

    $scope.menuIsActive = function (states) {
      if (typeof states === 'string') {
        states = [states];
      }
      return states.indexOf($state.current.name) >= 0;
    };

  });
