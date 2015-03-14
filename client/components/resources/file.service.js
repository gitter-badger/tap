'use strict';

angular.module('tapApp')
  .factory('File', function ($resource) {
    return $resource('/api/files/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
