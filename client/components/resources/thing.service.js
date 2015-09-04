(function () {
  'use strict';

  angular.module('tapApp')
    .factory('Thing', ThingFactory);

  ThingFactory.$inject = ['$resource'];

  function ThingFactory($resource) {
    var resource = $resource('/api/things/:id/:controller', {id: '@_id'}, {
      update: {method: 'PUT'}
    });

    //business rule

    return resource;
  }
})();
