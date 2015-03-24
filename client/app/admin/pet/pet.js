'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.pet', {
        url: '/pet?id',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('ong');
        },
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/admin/pet/pet.html',
            controller: 'PetCtrl'
          }
        }
      });
  });
