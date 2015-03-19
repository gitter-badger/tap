'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.organization', {
        url: '/organizacoes',
        title: 'TAP',
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/organization/organization.html',
            controller: 'OrganizationCtrl'
          }
        }
      });
  });
