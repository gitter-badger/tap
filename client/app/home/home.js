'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.home', {
        url: '/',
        title: 'TAP',
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      });
  });
