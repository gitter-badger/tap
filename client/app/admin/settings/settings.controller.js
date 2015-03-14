'use strict';

angular.module('tapApp')
  .controller('SettingsCtrl', function ($scope, Auth) {
    $scope.errors = {};

    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function () {
            $scope.ui.alert('Senha alterada com sucesso', 'success');
            $scope.submitted = false;
            form.$setPristine();
            $scope.user.oldPassword = '';
            $scope.user.newPassword = '';
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            $scope.submitted = false;
            $scope.ui.alert('A senha não confere!', 'danger');
          });
      }
    };
  });
