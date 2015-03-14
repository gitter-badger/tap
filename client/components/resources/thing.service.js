'use strict';

angular.module('tapApp')
  .factory('Thing', function ($resource) {
    return $resource('/api/things/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
