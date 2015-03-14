'use strict';

angular.module('tapApp')
  .factory('LoginModal', function LoginModal($modal) {
    var isOpen = false;
    return {
      open: function () {
        if (isOpen === true) {
          return;
        }
        isOpen = true;
        var modalInstance = $modal.open({
          templateUrl: 'app/account/login/login-modal.html',
          controller: 'LoginModalCtrl'
        });
        modalInstance.result.then(function () {
          isOpen = false;
        }, function () {
          isOpen = false;
        });
      }
    };
  });
