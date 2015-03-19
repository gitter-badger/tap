'use strict';

angular.module('tapApp')
  .controller('OrganizationCtrl', function ($scope, Organization, $stateParams, $location) {
    $scope.organizations = Organization.query();
    $scope.organization = {address: {}, location: [-27.2361006, -48.63049419999999]};

    $scope.mapCenter = {
      latitude: $scope.organization.location[0],
      longitude: $scope.organization.location[1]
    };

    $scope.mapPlaceChanged = function (searchBox) {
      var places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      var lat = places[0].geometry.location.lat();
      var lon = places[0].geometry.location.lng();
      $scope.mapCenter = {latitude: lat, longitude: lon};
    };

    $scope.edit = function (organization) {
      $scope.ui.loading();
      var organizationId = (_.isObject(organization)) ? organization._id : organization;
      $location.search('id', organizationId);
      Organization.get({id: organizationId}, function (organization) {
        $scope.mapCenter = {latitude: organization.location[0], longitude: organization.location[1]};
        $scope.organization = organization;
        $scope.ui.loaded();
      }, function (err) {
        $scope.ui.alert('Erro ao carregaro registro', 'danger');
        $scope.ui.loaded();
        console.log(err);
      });
    };

    $scope.clear = function (form) {
      $scope.organization = {address: {}, location: [-27.2361006, -48.63049419999999]};
      $location.search('id', null);
      form.$setPristine();
    };

    $scope.save = function (form) {
      if (form.$valid) {
        $scope.submitted = true;
        $scope.organization.location = [$scope.mapCenter.latitude, $scope.mapCenter.longitude];
        if ($scope.organization._id) {
          $scope.update($scope.organization);
          return;
        }
        $scope.create($scope.organization, form);
      }
    };

    $scope.update = function (organization) {
      $scope.ui.loading();
      organization.$update(function () {
        $scope.submitted = false;
        $scope.ui.loaded();
        var index = _.findIndex($scope.organizations, {_id: organization._id});
        $scope.organizations.splice(index, 1, angular.copy(organization));
        $scope.ui.alert('Atualizado com sucesso!', 'success');
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível atualizar o registro', 'danger');
        console.log(err);
      });
    };

    $scope.create = function (organizationNew, form) {
      $scope.ui.loading();
      Organization.save(organizationNew, function (organization) {
        $scope.clear(form);
        $scope.ui.alert('Adicionado com sucesso!', 'success');
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.organizations.push(organization);
        $location.search('id', organization._id);
      }, function (err) {
        $scope.submitted = false;
        $scope.ui.loaded();
        $scope.ui.alert('Não foi possível adicionar o registro!', 'danger');
        console.log(err);
      });
    };

    $scope.delete = function (organization, form) {
      $scope.ui.confirm('Tem certeza que deseja deletar ?', function () {
        organization.$delete(function () {
          $location.search('id', null);
          var index = _.findIndex($scope.organizations, {_id: organization._id});
          $scope.organizations.splice(index, 1);
          if ($scope.organization._id === organization._id) {
            $scope.clear(form);
          }
          $scope.ui.alert('Deletado com sucesso!', 'success');
        }, function (err) {
          $scope.ui.alert('Não foi possível deletar o registro!', 'danger');
          console.log(err);
        });
      });
    };

    if ($stateParams.id) {
      $scope.edit($stateParams.id);
    }
  });
