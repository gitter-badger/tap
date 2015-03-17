'use strict';

angular.module('tapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.info', {
        url: '/info?type',
        title: 'tapApp',
        reloadOnSearch: true,
        views: {
          '': {
            templateUrl: 'app/info/info.html',
            controller: 'InfoCtrl'
          }
        }
      });
  });
