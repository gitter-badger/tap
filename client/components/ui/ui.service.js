'use strict';

angular.module('tapApp')
  .service('UI', function ($timeout, $window, notify) {
    this.alerts = [];
    this.loader = false;

    this.toTop = function () {
      jQuery('html, body').animate({scrollTop: 0}, '500', 'swing');
    };

    this.loading = function () {
      this.loader = true;
    };

    this.loaded = function () {
      this.loader = false;
    };

    this.isLoading = function () {
      return this.loader;
    };

    this.alert = function (message, type) {
      notify({message: message, classes: 'alert-' + type});
    };

    this.removeAlerts = function () {
      notify.closeAll();
    };

    this.confirm = function (message, callback) {
      callback = callback || angular.noop;
      $timeout(function () {
        var confirm = $window.confirm(message);
        if (confirm) {
          callback();
        }
      });
    };

  });
