'use strict';

angular.module('tapApp')
  .factory('Folder', function ($resource) {
    return $resource('/api/folders/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
