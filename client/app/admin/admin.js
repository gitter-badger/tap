'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        url: '/admin'
      });
  });
