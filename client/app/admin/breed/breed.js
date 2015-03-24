'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.breed', {
        url: '/breed?id',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('ong');
        },
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/admin/breed/breed.html',
            controller: 'BreedCtrl'
          }
        }
      });
  });
