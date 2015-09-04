(function () {
  'use strict';

  angular.module('tapApp')
    .factory('resourceUpdater', resourceUpdater);

  resourceUpdater.$inject = ['$q'];

  function resourceUpdater($q) {

    return update;

    function update(resource, resourceList, form) {
      return $q(function (resolve, reject) {
        if (resource.$updating || form.$invalid) {
          return reject();
        }
        resource.$updating = true;

        resource
          .$update()
          .then(function () {
            if (resourceList && angular.isArray(resourceList)) {
              resourceList.splice(_.findIndex(resourceList, {_id: resource._id}), 1, resource);
            }

            resource.$updating = false;
            resolve(resource);
          })
          .catch(function (error) {
            resource.$updating = false;
            reject(error);
          });
      });
    }
  }
})();
