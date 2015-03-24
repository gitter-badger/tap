'use strict';

angular.module('tapApp')
  .filter('enum', function (ENUM) {
    return function (id, name) {
      return ENUM.getItem(name, id).label;
    };
  });
