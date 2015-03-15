'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.dashboard', {
        url: '/dashboard',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('org');
        },
        views: {
          '': {
            templateUrl: 'app/admin/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }

      });
  });
