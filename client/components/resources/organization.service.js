'use strict';

angular.module('tapApp')
  .factory('Organization', function ($resource) {
    return $resource('/api/organizations/:id/:controller', {
        id: '@_id'
      },
      {
        update: {method: 'PUT'}
      });
  });
