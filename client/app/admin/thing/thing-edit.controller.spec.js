'use strict';

describe('Controller: ThingEditController', function () {

  var Controller, Thing, notifier, $state, $rootScope, resourceManager, $q;

  beforeEach(module('tapApp'));

  beforeEach(inject(function ($controller, _Thing_, _notifier_, _$state_, _$rootScope_, _resourceManager_, _$q_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    resourceManager = _resourceManager_;
    Thing = _Thing_;
    notifier = _notifier_;
    $state = _$state_;
    $state.params = {id: 1};

    spyOn(Thing, 'get').and.returnValue({_id: 1, name: 'Awesome Thing', info: 'test'});

    Controller = $controller('ThingEditController', {$state: $state});
  }));

  it('calls the thing resource with params', function () {
    expect(Thing.get).toHaveBeenCalledWith({id: 1});
  });

  it('attaches a thing to the vm', function () {
    expect(Controller.thing._id).toEqual(1);
  });

  describe('#update', function () {
    var things;

    beforeEach(function () {
      things = [{_id: 1, name: 'Awesome thing', info: 'test'},
        {_id: 2, name: 'Another thing', info: 'test'}];

      spyOn(notifier, 'notify');
    });

    it('calls the resourceManager#update with params', function () {
      spyOn(resourceManager, 'update').and.callFake(function () {
        return $q(function (resolve) {
          resolve();
        });
      });
      Controller.update({$valid: true, $invalid: false}, Controller.thing, things);
      $rootScope.$apply();

      expect(resourceManager.update).toHaveBeenCalledWith(Controller.thing, things, {$valid: true, $invalid: false});
    });

    describe('when resource manager resolve the promise', function () {
      beforeEach(function () {
        spyOn($state, 'go');
        spyOn(resourceManager, 'update').and.callFake(function () {
          return $q(function (resolve) {
            resolve();
          });
        });
      });

      it('notifies the success', function () {
        Controller.update({$valid: true, $invalid: false}, Controller.thing, things);
        $rootScope.$apply();

        expect(notifier.notify).toHaveBeenCalledWith('Coisa cadastrada com sucesso!', 'success');
      });

      it('goes to index page', function () {
        Controller.update({$valid: true, $invalid: false}, Controller.thing, things);
        $rootScope.$apply();

        expect($state.go).toHaveBeenCalledWith('admin.thing.index');
      });
    });

    describe('when the resource manager reject the promise with errors', function () {
      beforeEach(function () {
        spyOn(resourceManager, 'update').and.callFake(function () {
          return $q(function (resolve, reject) {
            reject({error: 'some error'});
          });
        });
      });

      it('notifies the error', function () {
        Controller.update({$valid: true, $invalid: false}, Controller.thing, things);
        $rootScope.$apply();

        expect(notifier.notify).toHaveBeenCalledWith('Algum erro ocorreu ao atualizar', 'error');
      });
    });

    describe('when the resource manager reject the promise without error', function () {
      beforeEach(function () {
        spyOn(resourceManager, 'update').and.callFake(function () {
          return $q(function (resolve, reject) {
            reject();
          });
        });
      });

      it('does not notify', function () {
        Controller.update({$valid: true, $invalid: false}, Controller.thing, things);
        $rootScope.$apply();

        expect(notifier.notify).not.toHaveBeenCalled();
      });
    });
  });
});
