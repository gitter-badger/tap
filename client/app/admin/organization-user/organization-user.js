'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin.organization-user', {
        url: '/organization-user?id&organization',
        role: function ($injector) {
          return $injector.get('Auth').hasRole('admin');
        },
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/admin/organization-user/organization-user.html',
            controller: 'OrganizationUserCtrl'
          }
        }
      });
  });
