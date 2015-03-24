'use strict';

angular.module('tapApp')
  .factory('Breed', function ($resource) {
    return $resource('/api/breeds/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
