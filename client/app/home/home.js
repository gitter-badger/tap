'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.home', {
        url: '/',
        title: 'tapApp',
        reloadOnSearch: false,
        views: {
          '': {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      });
  });
