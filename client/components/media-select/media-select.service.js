'use strict';

angular.module('tapApp')
  .factory('MediaSelectModal', function ($modal) {
    var isOpen = false;
    return {
      select: function (cb, dismiss) {
        if (!dismiss) {
          dismiss = angular.noop;
        }
        if (isOpen === true) {
          return;
        }
        isOpen = true;
        var modalInstance = $modal.open({
          templateUrl: 'components/media-select/media-select.html',
          controller: 'MediaSelectCtrl',
          size: 'lg'
        });
        modalInstance.result.then(function (image) {
          isOpen = false;
          cb(image);
        }, function () {
          isOpen = false;
          dismiss();
        });
      }
    };
  });
