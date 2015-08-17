'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl as admin',
        url: '/admin'
      });
  });
