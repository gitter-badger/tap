'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.media', {
        url: '/media?id&show',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('admin');
        },
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/admin/media/media.html',
            controller: 'MediaCtrl'
          }
        }
      });
  });
