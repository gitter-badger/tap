'use strict';

describe('Controller: ThingIndexController', function () {

  var Controller;

  beforeEach(module('tapApp'));

  beforeEach(inject(function ($controller) {
    Controller = $controller('ThingIndexController');
  }));

  it('is a valid controller', function () {
    expect(Controller).toBeTruthy();
  });
});
