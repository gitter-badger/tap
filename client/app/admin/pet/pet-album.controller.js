'use strict';

angular.module('tapApp')
  .controller('PetAlbumCtrl', function ($scope, $modalInstance, pet, FileUpload) {
    $scope.pet = pet;
    $scope.updating = false;

    $scope.addImages = function (newImages) {
      $scope.imagesProgress = FileUpload.progress;
      FileUpload.upload(newImages, {}, function (err, file) {
        if (err) {
          return;
        }
        $scope.pet.images.push({
          url: file.url,
          width: file.width,
          height: file.height,
          filters: file.filterNamed
        });
      }, function () {
        $scope.imagesProgress = undefined;
      });
    };

    $scope.removeImage = function (index) {
      $scope.pet.images.splice(index, 1);
    };

    $scope.update = function () {
      $modalInstance.close($scope.pet);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
