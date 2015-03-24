'use strict';

angular.module('tapApp')
  .factory('Pet', function ($resource) {
    return $resource('/api/pets/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
