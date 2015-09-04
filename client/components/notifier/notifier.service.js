(function () {
  'use strict';

  angular.module('tapApp')
    .factory('notifier', notifierFactory);

  notifierFactory.$inject = ['notify'];

  function notifierFactory(notifyService) {
    return {
      notify: notify
    };

    function notify(message, type) {
      notifyService({message: message, classes: 'alert-' + type});
    }
  }
})();
