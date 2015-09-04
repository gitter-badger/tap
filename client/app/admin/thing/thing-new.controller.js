(function () {
  'use strict';

  angular.module('tapApp')
    .controller('ThingNewController', ThingNewController);

  ThingNewController.$inject = ['Thing', 'resourceManager', 'notifier', '$state'];

  function ThingNewController(Thing, resourceManager, notifier, $state) {
    var vm = this;

    vm.thing = new Thing();
    vm.create = create;

    function create(form, thing, things) {
      resourceManager
        .create(thing, things, form)
        .then(function () {
          notifier.notify('Coisa cadastrada com sucesso!', 'success');
          $state.go('admin.thing.index');
        })
        .catch(function (error) {
          if (error) {
            notifier.notify('Algum erro ocorreu!', 'danger');
          }
        });
    }
  }
})();
