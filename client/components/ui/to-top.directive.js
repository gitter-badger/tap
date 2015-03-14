'use strict';

angular.module('tapApp')
  .directive('toTop', function (UI) {
    return {
      restrict: 'A',
      link: function (scope, $elm) {
        $elm.on('click', function () {
          UI.toTop();
        });
      }
    };
  });
