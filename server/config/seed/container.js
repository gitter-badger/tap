var async = require('async');
var _ = require('lodash');

module.exports = Container;

function Container() {
  this.seeders = {};
}

Container.prototype.run = function (done) {
  async.map(this.seeders, function (seeder, done) {
    seeder.seed(done);
  }, function (err, results) {
    done(err, results);
  });
};

Container.prototype.build = function () {
  var container = this;
  var seedersCloned = _.clone(container.seeders);

  _.forEach(seedersCloned, function (seeder) {
    seeder.objects = _.mapValues(seeder.objects, function (object) {
      return replaceRefs(container, object)
    });
  });
};

Container.prototype.add = function (seeder) {
  this.seeders[seeder.id] = seeder;
};

function isSeedRef(value) {
  return _.isObject(value) && value.constructor && value.constructor.name === 'SeedRef';
}

function replaceRefs(container, object) {
  Object.keys(object).forEach(function (key) {
    if (isSeedRef(object[key])) {
      object[key] = container.seeders[object[key].id].get(object[key].ref)._id;
    }
    if (_.isObject(object[key])) {
      object[key] = replaceRefs(container, object[key]);
    }
  });

  return object;
}


