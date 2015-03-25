'use strict';

angular.module('tapApp')
  .directive('keypress', function () {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === Number(attrs.keypress)) {
          scope.$apply(function () {
            if(attrs.keypressDo){
              scope.$eval(attrs.keypressDo);
            }
          });
          event.preventDefault();
        }
      });
    };
  });
