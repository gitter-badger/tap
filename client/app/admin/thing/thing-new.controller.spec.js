'use strict';

describe('Controller: ThingNewController', function () {

  var Controller, Thing, notifier, $state, $rootScope, resourceManager, $q;

  beforeEach(module('tapApp'));

  beforeEach(inject(function ($controller, _Thing_, _notifier_, _$state_, _$rootScope_, _resourceManager_, _$q_) {
    Thing = _Thing_;
    notifier = _notifier_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    $q = _$q_;
    resourceManager = _resourceManager_;

    Controller = $controller('ThingNewController');
  }));

  it('attaches a new thing to the vm', function () {
    expect(Controller.thing).toEqual(new Thing());
  });

  describe('#create', function () {
    var things;

    beforeEach(function () {
      things = [{_id: 1, name: 'Awesome thing', info: 'test'},
        {_id: 2, name: 'Another thing', info: 'test'}];

      spyOn(notifier, 'notify');
    });

    it('calls the resourceManager#create with params', function () {
      spyOn(resourceManager, 'create').and.callFake(function () {
        return $q(function (resolve) {
          resolve();
        });
      });
      Controller.create({$valid: true, $invalid: false}, Controller.thing, things);
      $rootScope.$apply();

      expect(resourceManager.create).toHaveBeenCalledWith(Controller.thing, things, {$valid: true, $invalid: false});
    });

    describe('when the resource manager resolve the promise', function () {
      beforeEach(function () {
        spyOn($state, 'go');
        spyOn(resourceManager, 'create').and.callFake(function () {
          return $q(function (resolve) {
            resolve();
          });
        });
      });

      it('notifies the success', function () {
        Controller.create({$valid: true, $invalid: false}, Controller.thing, things);
        $rootScope.$apply();

        expect(notifier.notify).toHaveBeenCalledWith('Coisa cadastrada com sucesso!', 'success');
      });

      it('goes to the index page', function () {
        Controller.create({$valid: true, $invalid: false}, Controller.thing, things);
        $rootScope.$apply();

        expect($state.go).toHaveBeenCalledWith('admin.thing.index');
      });
    });

    describe('when the resource manager reject the promise without errors', function () {
      beforeEach(function () {
        spyOn(resourceManager, 'create').and.callFake(function () {
          return $q(function (resolve, reject) {
            reject();
          });
        });
      });

      it('does not notify', function () {
        Controller.create({$valid: false, $invalid: true}, Controller.thing, things);
        $rootScope.$apply();

        expect(notifier.notify).not.toHaveBeenCalled();
      });
    });

    describe('when the resource manager reject the promise with errors', function () {
      beforeEach(function () {
        spyOn(resourceManager, 'create').and.callFake(function () {
          return $q(function (resolve, reject) {
            reject({error: 'some error'});
          });
        });
      });

      it('notifies the error', function () {
        Controller.create({$valid: true, $invalid: false}, Controller.thing, things);
        $rootScope.$apply();

        expect(notifier.notify).toHaveBeenCalledWith('Algum erro ocorreu!', 'danger');
      });
    });
  });
});
