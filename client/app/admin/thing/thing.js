(function () {
  'use strict';

  angular.module('tapApp')
    .config(thingConfig);

  function role($injector) {
    return $injector.get('Auth').hasRole('admin');
  }

  function thingConfig($stateProvider) {
    $stateProvider
      .state('admin.thing', {
        abstract: true,
        url: '/thing',
        templateUrl: 'app/admin/thing/thing.html',
        controller: 'ThingController as base',
        role: role
      })
      .state('admin.thing.index', {
        url: '',
        templateUrl: 'app/admin/thing/thing-index.html',
        controller: 'ThingIndexController as vm',
        role: role
      })
      .state('admin.thing.new', {
        url: '/new',
        templateUrl: 'app/admin/thing/thing-new.html',
        controller: 'ThingNewController as vm',
        role: role
      })
      .state('admin.thing.edit', {
        url: '/:id/edit',
        templateUrl: 'app/admin/thing/thing-edit.html',
        controller: 'ThingEditController as vm',
        role: role
      });
  }
})();
