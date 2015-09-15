var Promise = require('bluebird');
var _ = require('lodash');
var FactoryGirl = require('factory-girl');
var Factory = new FactoryGirl.Factory();
var MongooseAdapter = require('factory-girl-mongoose').MongooseAdapter;
var Thing = require('./thing.model');

Factory.setAdapter(MongooseAdapter);

FactoryGirl.define('thing', Thing, {
  name: 'Awesome Thing',
  info: 'Create by Factory'
});

function promiseWrapper(method, custom) {
  return new Promise(function (fulfilld) {
    FactoryGirl[method]('thing', custom || {}, function (err, thing) {
      return fulfilld([err, thing]);
    });
  });
}

function build(custom) {
  return promiseWrapper('build', custom);
}

function buildInvalid(custom) {
  _.merge(custom, {name: 'f'});
  return promiseWrapper('build', custom);
}

function create(custom) {
  return promiseWrapper('create', custom);
}

function createInvalid(custom) {
  _.merge(custom, {name: 'f'});
  return promiseWrapper('create', custom);
}

module.exports = {
  build: build,
  buildInvalid: buildInvalid,
  create: create,
  createInvalid: createInvalid
};
