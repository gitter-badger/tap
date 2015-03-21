'use strict';

angular.module('tapApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
      },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        },
        getAdmin: {
          method: 'GET',
          isArray: false,
          params: {
            controller: 'admin'
          }
        },
        queryAdmin: {
          method: 'GET',
          isArray: true,
          params: {
            controller: 'admin'
          }
        },
        saveAdmin: {
          method: 'POST',
          params: {
            controller: 'admin'
          }
        },
        updateAdmin: {
          method: 'PUT',
          params: {
            controller: 'admin'
          }
        }
      });
  });
