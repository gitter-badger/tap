(function () {
  'use strict';

  angular.module('tapApp')
    .directive('tapFormGroup', tapFormGroupDirective);

  function tapFormGroupDirective() {
    return {
      restrict: 'AE',
      scope: {
        input: '=input',
        form: '=form'

      },
      link: link
    };
  }

  function link(scope, element) {
    element.addClass('form-group');

    scope.$watch('form.$submitted', function (newValue) {
      if (newValue) {
        toggleClass(scope.input.$valid, element);
      }
    }, true);

    scope.$watch('input.$dirty', function (newValue) {
      if (newValue) {
        toggleClass(scope.input.$valid, element);
      }
    }, true);

    scope.$watch('input.$valid', function (newValue) {
      if (scope.input.$dirty) {
        toggleClass(newValue, element);
      }
    }, true);

    scope.$watch('input.$invalid', function (newValue) {
      if (scope.input.$dirty) {
        toggleClass(!newValue, element);
      }
    }, true);
  }

  function toggleClass(valid, element){
    if (valid) {
      element.removeClass('has-error');
      element.addClass('has-success');
    } else {
      element.removeClass('has-success');
      element.addClass('has-error');
    }
  }

})();
