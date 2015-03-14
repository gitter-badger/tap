'use strict';

angular.module('tapApp')
  .directive('hideToTop', function () {
    return {
      restrict: 'A',
      link: function (scope, $elm, $attrs) {
        if (jQuery(window).scrollTop() > ($attrs.scrollTop || 250)) {
          jQuery($elm[0]).slideDown();
        } else {
          jQuery($elm[0]).slideUp();
        }
        jQuery(window).scroll(function () {
          if (jQuery(this).scrollTop() > ($attrs.scrollTop || 250)) {
            jQuery($elm[0]).slideDown();
          } else {
            jQuery($elm[0]).slideUp();
          }
        });
      }
    };
  });
