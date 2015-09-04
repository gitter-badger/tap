(function () {
  'use strict';

  angular.module('tapApp')
    .controller('ThingController', ThingController);

  ThingController.$inject = ['Thing', 'notifier', 'resourceManager'];

  function ThingController(Thing, notifier, resourceManager) {
    var vm = this;

    vm.things = Thing.query();
    vm.destroy = destroy;

    function destroy(thing, things) {
      resourceManager
        .destroy(thing, things)
        .then(function () {
          notifier.notify('Coisa deletada com sucesso', 'success');
        })
        .catch(function (error) {
          if (error) {
            notifier.notify('Não foi possível deletar a coisa, tente mais tarde.', 'danger');
          }
        });
    }
  }
})();
