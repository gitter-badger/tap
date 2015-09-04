(function () {
  'use strict';

  angular.module('tapApp')
    .run(redirectToLastPageBeforeLogin)
    .run(configureNotify)
    .run(translateGrid)
    .run(secureStates)
    .run(SEOStates);

  redirectToLastPageBeforeLogin.$inject = ['$window', '$cookieStore', '$location'];

  function redirectToLastPageBeforeLogin($window, $cookieStore, $location) {
    if ($cookieStore.get('state')) {
      var url = $cookieStore.get('state');
      $cookieStore.remove('state');
      if ($location.url() !== url) {
        $window.location.href = url;
      }
    }
  }

  configureNotify.$inject = ['notify'];

  function configureNotify(notify) {
    notify.config({
      position: 'right',
      duration: 5000
    });
  }

  function translateGrid() {
    var defaultTranslation = {
      'Born': 'Criado',
      'Search': 'Buscar',
      'Page': 'Página',
      'First Page': 'Primeira Página',
      'Next Page': 'Próxima Página',
      'Previous Page': 'Página Anterior',
      'Last Page': 'Última Página',
      'Sort': 'Ordenar',
      'No items to display': 'Não há itens para exibir',
      'displayed': 'Exibidos',
      'in total': 'No Total'
    };

    defaultTranslation[TrNgGrid.translationDateFormat] = 'dd/MM/yyyy';

    TrNgGrid.translations['pt-br'] = defaultTranslation;
  }

  secureStates.$inject = ['$rootScope', 'Auth', '$state', '$injector', 'LoginModal'];

  function secureStates($rootScope, Auth, $state, $injector, LoginModal) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function (loggedIn) {
        if ((next.authenticate || next.role) && !loggedIn) {
          event.preventDefault();
          $state.go('main.home');
          LoginModal.open();
          return;
        }
        if ((next.role && loggedIn) && !next.role($injector)) {
          event.preventDefault();
          $state.go('main.home');
        }
      });
    });
  }

  SEOStates.$inject = ['$rootScope', '$window', '$location', 'SEO'];

  function SEOStates($rootScope, $window, $location, SEO){
    $rootScope.$on('$stateChangeSuccess', function (event, current) {
      SEO.title(current.title || 'TAP');
      SEO.ogUrl(current.ogUrl || '/');
      SEO.ogTitle(current.ogTitle || 'TAP');
      SEO.ogDescription(current.ogDescription || 'TAP');
      if ($window.ga) {
        $window.ga('set', {page: $location.url(), title: (current.title || 'TAP')});
        $window.ga('send', 'pageview');
      }
    });
  }
})();
