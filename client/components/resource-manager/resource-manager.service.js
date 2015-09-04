(function () {
  'use strict';

  angular.module('tapApp')
    .factory('resourceManager', resourceManagerFactory);

  resourceManagerFactory.$inject = ['resourceDestroyer', 'resourceCreator', 'resourceUpdater'];

  function resourceManagerFactory(resourceDestroyer, resourceCreator, resourceUpdater) {
    var progress = 0;

    return {
      destroy: progressManager(resourceDestroyer),
      create: progressManager(resourceCreator),
      update: progressManager(resourceUpdater),
      inProgress: inProgress
    };

    function inProgress() {
      return progress > 0;
    }

    function progressManager(command) {
      return function () {
        var promisse = command.apply({}, arguments);

        progress++;

        promisse.finally(function () {
          progress--;
        });

        return promisse;
      };
    }
  }
})();
