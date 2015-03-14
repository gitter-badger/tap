'use strict';

angular.module('tapApp')
  .filter('cep', function () {
    return function (cep) {
      if (!cep) {
        cep = '';
      }
      if (!_.isString(cep)) {
        cep = cep.toString();
      }
      var part1 = cep.slice(0, 5);
      var part2 = cep.slice(-3);

      return part1 + '-' + part2;
    };
  });
