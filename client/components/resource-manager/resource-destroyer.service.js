(function () {
  'use strict';

  angular.module('tapApp')
    .factory('resourceDestroyer', resourceDestroyerFactory);

  resourceDestroyerFactory.$inject = ['popup', '$q'];

  function resourceDestroyerFactory(popup, $q) {

    return destroy;

    function destroy(resource, resourceList) {
      return $q(function (resolve, reject) {
        if (resource.$deleting) {
          return reject();
        }

        var confirm = popup.confirm('CUIDADO!', 'Está ação é inreversível.');

        confirm
          .then(function () {
            resource.$deleting = true;
            return resource.$delete();
          })
          .then(function (response) {
            if (resourceList && angular.isArray(resourceList)) {
              resourceList.splice(_.findIndex(resourceList, {_id: resource._id}), 1);
            }

            resolve(resource, response);
          })
          .catch(function (error) {
            if (error) {
              console.log(error);
            }
            resource.$deleting = false;
            reject(error);
          });
      });
    }
  }

})();
