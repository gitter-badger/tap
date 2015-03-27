'use strict';

angular.module('tapApp')
  .factory('City', function ($resource) {
    return $resource('/api/cities/:id/:controller', {id: '@_id'}, {
      update: {method: 'PUT'}
    });
  });
