(function () {
  'use strict';

  angular.module('tapApp')
    .factory('popup', popupFactory);

  popupFactory.$injcet = ['$q', '$window'];

  function popupFactory($q, $window) {
    return {
      alert: alert,
      confirm: confirm
    };

    function alert(title, message) {
      return $q(function (resolve) {
        $window.alert(title + '\n' + message);
        resolve(true);
      });
    }

    function confirm(title, message) {
      return $q(function (resolve, reject) {
        var confirm = $window.confirm(title + '\n' + message);
        var command = confirm ? resolve : reject;

        command();
      });
    }
  }
})();
