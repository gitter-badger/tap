(function () {
  'use strict';

  angular.module('tapApp')
    .factory('resourceCreator', resourceCreator);

  resourceCreator.$inject = ['$q'];

  function resourceCreator($q) {

    return create;

    function create(resource, resourceList, form) {
      return $q(function (resolve, reject) {
        if (form.$invalid || resource.$saving || resource._id) {
          return reject();
        }

        resource.$saving = true;
        resource
          .$save()
          .then(function () {
            if (resourceList) {
              resourceList.unshift(resource);
            }
            resource.$saving = false;
            resolve(resource);
          })
          .catch(function (error) {
            if (error) {
              console.log(error);
            }
            resource.$saving = false;
            reject(error);
          });
      });
    }
  }
})();
