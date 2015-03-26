'use strict';

angular.module('tapApp')
  .controller('PetCtrl', function ($scope, Pet, $stateParams, $location, ENUM, Breed, Organization, FileUpload, $modal) {
    $scope.pets = [];
    $scope.petsCount = 0;
    $scope.pet = {};
    $scope.typeEnum = ENUM.get('petType');
    $scope.sizeEnum = ENUM.get('petSize');
    $scope.ageEnum = ENUM.get('petAge');
    $scope.genderEnum = ENUM.get('petGender');
    $scope.breeds = [];
    $scope.organizations = [];
    $scope.gridLoading = false;
    $scope.gridFilters = {};

    if ($scope.getCurrentUser().role !== 'org') {
      $scope.organizations = Organization.query();
    }

    $scope.profilePictureUpload = function (newFiles) {
      $scope.profilePictureUploadProgress = FileUpload.progress;
      FileUpload.upload(newFiles, {}, function (err, file) {
        if (err) {
          return;
        }
        $scope.pet.profilePicture = {
          url: file.url,
          width: file.width,
          height: file.height,
          filters: file.filterNamed
        };
      }, function () {
        $scope.ui.alert('Upload concluído com sucesso!', 'success');
        $scope.profilePictureUploadProgress = undefined;
      });
    };

    $scope.edit = function (pet) {
      $scope.ui.loading();
      var petId = (_.isObject(pet)) ? pet._id : pet;
      $location.search('id', petId);
      Pet.get({id: petId}, function (pet) {
        $scope.pet = pet;
        $scope.ui.loaded();
        $scope.updateBreeds(pet.type)
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.pet = {};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        $scope.submitted = true;
        if ($scope.pet._id) {
          $scope.update($scope.pet);
          return;
        }
        $scope.create($scope.pet, form);
      }
    };

    $scope.update = function (pet) {
      $scope.ui.loading();
      pet.$update(function (saved) {
        $scope.pet = saved;
        pet = saved;
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.gridRefresh();
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (petNew, form) {
      $scope.ui.loading();
      Pet.save(petNew, function (pet) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.gridRefresh();
        $location.search('id', pet._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.delete = function (pet, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        pet.$delete(function () {
          $location.search('id', null);
          $scope.gridRefresh();
          if ($scope.pet._id === pet._id) {
            $scope.clear(form);
          }
          $scope.ui.alert('Deletado com sucesso!', 'success');
        }, function (err) {
          $scope.ui.alert('Não foi possível deletar o registro!', 'danger');
          console.log(err);
        });
      });
    };

    $scope.updateBreeds = function (type) {
      $scope.breeds = Breed.query({type: type}, function () {
        if (!$scope.pet._id) {
          return;
        }
        var petBreeds = [];
        angular.forEach($scope.breeds, function (breed) {
          var index = _.findIndex($scope.pet.breeds, function (petBreed) {
            return petBreed == breed._id;
          });
          if (index >= 0) {
            petBreeds.push(breed._id);
          }
        });
        $scope.pet.breeds = petBreeds;
      });
    };

    $scope.openAlbum = function () {
      if ($scope.albumIsOpened === true || !$scope.pet._id) {
        return;
      }
      $scope.albumIsOpened = true;
      var modalInstance = $modal.open({
        templateUrl: 'app/admin/pet/pet-album.html',
        controller: 'PetAlbumCtrl',
        size: 'lg',
        resolve: {
          pet: function () {
            return angular.copy($scope.pet);
          }
        }
      });
      modalInstance.result.then(function (pet) {
        $scope.albumIsOpened = false;
        $scope.submitted = true;
        $scope.pet = pet;
        $scope.update(pet);
      }, function () {
        $scope.albumIsOpened = false;
      });
    };

    $scope.gridLoad = function (currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
      if (orderByReverse) {
        orderBy = ('-' + orderBy);
      }

      $scope.gridFilters.currentPage = currentPage;
      $scope.gridFilters.pageItems = pageItems;
      $scope.gridFilters.filterBy = filterBy;
      $scope.gridFilters.filterByFields = filterByFields;
      $scope.gridFilters.orderBy = orderBy;
      $scope.gridFilters.orderByReverse = orderByReverse;

      if ($scope.getCurrentUser().role === 'org') {
        filterByFields.organization = $scope.getCurrentUser().organization;
      }

      $scope.gridLoading = true;
      Pet.query(_.merge({
        page: currentPage + 1,
        limit: pageItems,
        sort: orderBy
      }, filterByFields), function (response) {
        $scope.pets = response.resources;
        $scope.petsCount = response.count;
        $scope.gridLoading = false;
      });
    };

    $scope.gridRefresh = function () {
      $scope.gridLoad(
        $scope.gridFilters.currentPage,
        $scope.gridFilters.pageItems,
        $scope.gridFilters.filterBy,
        $scope.gridFilters.filterByFields,
        $scope.gridFilters.orderBy,
        $scope.gridFilters.orderByReverse
      );
    };

    if ($stateParams.id) {
      $scope.edit($stateParams.id);
    }
  });
