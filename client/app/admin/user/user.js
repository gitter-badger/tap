'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.user', {
        url: '/user?id',
        role: function ($injector) {
          return $injector.get('Auth').isAdmin();
        },
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/admin/user/user.html',
            controller: 'UserCtrl'
          }
        }
      });
  });
