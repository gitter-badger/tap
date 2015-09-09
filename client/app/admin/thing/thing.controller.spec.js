'use strict';

describe('Controller: ThingController', function () {

  var Controller, popup, $q, things, resourceManager, notifier, $rootScope, Thing;

  beforeEach(module('tapApp'));

  beforeEach(function () {
    things = [{_id: 1, name: 'Awesome thing', info: 'test'},
      {_id: 2, name: 'Another thing', info: 'test'}];
  });

  beforeEach(inject(function ($controller, _popup_, _$q_, _resourceManager_, _notifier_, _$rootScope_, _Thing_) {
    popup = _popup_;
    $q = _$q_;
    resourceManager = _resourceManager_;
    notifier = _notifier_;
    $rootScope = _$rootScope_;
    Thing = _Thing_;

    spyOn(Thing, 'query').and.returnValue(things);

    Controller = $controller('ThingController');
  }));

  it('attaches a list of things to the vm', function () {
    $rootScope.$apply();
    expect(Controller.things.length).toBe(2);
    expect(Controller.things[0]._id).toEqual(1);
  });

  describe('#destroy', function () {
    beforeEach(function () {
      spyOn(popup, 'confirm').and.callFake(function () {
        return $q(function (resolve) {
          resolve();
        });
      });

      spyOn(notifier, 'notify');
    });

    it('calls the resourceManager#destroy with params', function () {
      spyOn(resourceManager, 'destroy').and.callFake(function () {
        return $q(function (resolve) {
          resolve();
        });
      });

      Controller.destroy(Controller.things[0], Controller.things);
      $rootScope.$apply();

      expect(resourceManager.destroy).toHaveBeenCalledWith(Controller.things[0], Controller.things);
    });

    describe('when the resource manager resolve the promise', function () {
      beforeEach(function () {
        spyOn(resourceManager, 'destroy').and.callFake(function () {
          return $q(function (resolve) {
            return resolve();
          });
        });
      });

      it('notifies success', function () {
        Controller.destroy(Controller.things[0], Controller.things);
        $rootScope.$apply();

        expect(notifier.notify).toHaveBeenCalledWith('Coisa deletada com sucesso', 'success');
      });
    });

    describe('when the resource manager reject the promise with errors', function () {
      beforeEach(function () {
        spyOn(resourceManager, 'destroy').and.callFake(function () {
          return $q(function (resolve, reject) {
            return reject({error: 'some error'});
          });
        });
      });

      it('notifies error', function () {
        Controller.destroy(Controller.things[0], Controller.things);
        $rootScope.$apply();

        expect(notifier.notify).toHaveBeenCalledWith('Não foi possível deletar a coisa, tente mais tarde.', 'danger');
      });
    });

    describe('when the resource manager reject the promise without errors', function () {
      beforeEach(function () {
        spyOn(resourceManager, 'destroy').and.callFake(function () {
          return $q(function (resolve, reject) {
            return reject();
          });
        });
      });

      it('does not notify', function () {
        Controller.destroy(Controller.things[0], Controller.things);
        $rootScope.$apply();

        expect(notifier.notify).not.toHaveBeenCalled();
      });
    });
  });
});
