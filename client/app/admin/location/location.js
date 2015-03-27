'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.state', {
        url: '/state?id',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('admin');
        },
        views: {
          '': {
            templateUrl: 'app/admin/location/state/state.html',
            controller: 'StateCtrl'
          }
        }
      })
      .state('admin.city', {
        url: '/city?id&state',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('admin');
        },
        views: {
          '': {
            templateUrl: 'app/admin/location/city/city.html',
            controller: 'CityCtrl'
          }
        }
      });
  });
