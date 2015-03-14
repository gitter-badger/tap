'use strict';

angular.module('tapApp')
  .directive('toggleClass', function () {
    return {
      restrict: 'A',
      link: function (scope, $elm, $attrs) {
        $elm.click(function () {
          if ($attrs.target) {
            jQuery($attrs.target).toggleClass($attrs.toggleClass);
          } else {
            $elm.toggleClass($attrs.toggleClass);
          }
        });
      }
    };
  });
