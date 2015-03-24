'use strict';

angular.module('tapApp')
  .factory('ENUM', function () {
    /**
     * Enumerações
     */
    var enums = {};

    /**
     * Tipo do pet
     */
    enums.petType = [{
      label: 'Cachorro',
      id: 'dog'
    }, {
      label: 'Gato',
      id: 'cat'
    }];

    /**
     * Tamanho do pet
     */
    enums.petSize = [{
      label: 'Pequeno',
      id: 'small'
    }, {
      label: 'Medio',
      id: 'medium'
    }, {
      label: 'Grande',
      id: 'larger'
    }];

    /**
     * Sexo do pet
     */
    enums.petGender = [{
      label: 'Macho',
      id: 'male'
    }, {
      label: 'Fêmea',
      id: 'female'
    }];


    /**
     * Idade do pet
     */
    enums.petAge = [{
      label: 'Baby',
      id: 'baby'
    }, {
      label: 'Jovem',
      id: 'young'
    }, {
      label: 'Adulto',
      id: 'adult'
    }, {
      label: 'Sênior',
      id: 'senior'
    }];

    return {
      get: function (name) {
        return enums[name];
      },
      getItem: function (name, id) {
        return _.find(enums[name], {id: id});
      }
    };
  });
