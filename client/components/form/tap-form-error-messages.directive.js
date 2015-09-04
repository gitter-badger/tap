(function () {
  'use strict';

  angular.module('tapApp')
    .directive('tapFormErrorMessages', tapFormErrorMessagesDirective);

  function tapFormErrorMessagesDirective() {
    return {
      restrict: 'AE',
      scope: {
        input: '=input',
        form: '=form'
      },
      templateUrl: 'components/form/error-messages-template.html'
    };
  }
})();
