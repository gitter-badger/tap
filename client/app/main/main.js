'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
