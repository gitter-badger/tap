angular.module('tapApp')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      .state('admin', {
        abstract: true,
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl as admin',
        url: '/admin'
      });
  });
