(function () {
  'use strict';

  angular.module('tapApp')
    .config(thingConfig);

  function thingConfig($stateProvider) {
    $stateProvider
      .state('admin.thing', {
        abstract: true,
        url: '/thing',
        templateUrl: 'app/admin/thing/thing.html',
        controller: 'ThingController as base'
      })
      .state('admin.thing.index', {
        url: '',
        templateUrl: 'app/admin/thing/thing-index.html',
        controller: 'ThingIndexController as vm',
        role: 'admin'
      })
      .state('admin.thing.new', {
        url: '/new',
        templateUrl: 'app/admin/thing/thing-new.html',
        controller: 'ThingNewController as vm',
        role: 'admin'
      })
      .state('admin.thing.edit', {
        url: '/:id/edit',
        templateUrl: 'app/admin/thing/thing-edit.html',
        controller: 'ThingEditController as vm',
        role: 'admin'
      });
  }
})();
