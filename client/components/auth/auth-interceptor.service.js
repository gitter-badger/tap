(function () {
  'use strict';

  angular.module('tapApp')
    .factory('authInterceptor', authInterceptorFactory);

  authInterceptorFactory.$inject = ['$q', '$cookieStore', '$injector'];

  function authInterceptorFactory($q, $cookieStore, $injector) {
    return {
      request: addAuthorizationToken,
      responseError: handle401
    };

    function addAuthorizationToken(config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    }

    function handle401(response) {
      if (response.status === 401) {
        $injector.get('$state').go('main.home');
        $injector.get('LoginModal').open();

        $cookieStore.remove('token');
        return $q.reject(response);
      }

      return $q.reject(response);
    }
  }
})();
