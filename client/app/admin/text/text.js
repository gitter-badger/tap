'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.text', {
        url: '/text?id',
        role: function ($injector) {
          return $injector.get('Auth').isAdmin();
        },
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/admin/text/text.html',
            controller: 'TextCtrl'
          }
        }
      });
  });
