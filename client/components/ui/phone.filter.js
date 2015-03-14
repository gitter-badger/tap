'use strict';

angular.module('tapApp')
  .filter('phone', function () {
    return function (phone) {
      if (!phone) {
        return '';
      }
      if (!_.isString(phone)) {
        phone = phone.toString();
      }
      var cod = phone.slice(0, 2);
      var part2 = phone.slice(-4);
      var part1 = phone.slice(2, -4);

      return '(' + cod + ')' + ' ' + part1 + '-' + part2;
    };
  });
