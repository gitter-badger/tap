'use strict';

angular.module('tapApp')
  .filter('humanizeDateAgo', function ($window) {
    var pad = function (number) {
      if (number < 10) {
        return '0' + number.toString();
      }

      return number.toString();
    };
    return function (date) {
      if ((date instanceof Date) === false) {
        date = new Date(date);
      }
      var now = new Date();
      var minutes = $window.Math.round(((now.getTime() - date.getTime()) / 1000) / 100);
      if (minutes < 60) {
        if (minutes <= 0) {
          return 'Neste momento';
        }
        return $window.Math.round(minutes) + ' minuto(s) atrás';
      }
      var hours = $window.Math.round(minutes / 60);
      if (hours < 24) {
        return hours + ' hora(s) atrás';
      }
      return pad(date.getDate()) + '/' + pad(date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
    };
  });
