'use strict';

describe('State: Thing States', function () {

  beforeEach(module('tapApp'));

  var $state;

  beforeEach(inject(function (_$state_) {
    $state = _$state_;
  }));

  describe('admin.thing', function () {
    var state;

    beforeEach(function () {
      state = $state.get('admin.thing');
    });

    it('should be abstract', function () {
      expect(state.abstract).toBe(true);
    });

    it('matches a path', function () {
      expect(state.url).toEqual('/thing');
    });

    it('renders the html', function () {
      expect(state.templateUrl).toEqual('app/admin/thing/thing.html');
    });

    it('uses the right controller', function () {
      expect(state.controller).toEqual('ThingController as base');
    });
  });

  describe('admin.thing.index', function () {
    var state;

    beforeEach(function () {
      state = $state.get('admin.thing.index');
    });

    it('should not be abstract', function () {
      expect(state.abstract).toBeFalsy();
    });

    it('matches a path', function () {
      expect(state.url).toEqual('');
    });

    it('renders the html', function () {
      expect(state.templateUrl).toEqual('app/admin/thing/thing-index.html');
    });

    it('uses the right controller', function () {
      expect(state.controller).toEqual('ThingIndexController as vm');
    });

    it('restricts to admin role', function () {
      expect(state.role).toEqual('admin');
    });
  });

  describe('admin.thing.new', function () {
    var state;

    beforeEach(function () {
      state = $state.get('admin.thing.new');
    });

    it('should not be abstract', function () {
      expect(state.abstract).toBeFalsy();
    });

    it('matches a path', function () {
      expect(state.url).toEqual('/new');
    });

    it('renders the html', function () {
      expect(state.templateUrl).toEqual('app/admin/thing/thing-new.html');
    });

    it('uses the right controller', function () {
      expect(state.controller).toEqual('ThingNewController as vm');
    });

    it('restricts to admin role', function () {
      expect(state.role).toEqual('admin');
    });
  });

  describe('admin.thing.edit', function () {
    var state;

    beforeEach(function () {
      state = $state.get('admin.thing.edit');
    });

    it('should not be abstract', function () {
      expect(state.abstract).toBeFalsy();
    });

    it('matches a path', function () {
      expect(state.url).toEqual('/:id/edit');
    });

    it('renders the html', function () {
      expect(state.templateUrl).toEqual('app/admin/thing/thing-edit.html');
    });

    it('uses the right controller', function () {
      expect(state.controller).toEqual('ThingEditController as vm');
    });

    it('restricts to admin role', function () {
      expect(state.role).toEqual('admin');
    });
  });
});
