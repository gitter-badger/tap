'use strict';

angular.module('tapApp')
  .factory('State', function ($resource) {
    return $resource('/api/states/:id/:controller', {id: '@_id'}, {
      update: {method: 'PUT'}
    });
  });
