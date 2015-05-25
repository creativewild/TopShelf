(function() {

  'use strict';

  angular.module('app.core')
    .config(configuration)
    .run(routingEvents);

  configuration.$inject = ['$urlRouterProvider', '$locationProvider',
    '$httpProvider', '$sceProvider'
  ];
  /* @ngInject */
  function configuration($urlRouterProvider, $locationProvider,
    $httpProvider, $sceProvider) {

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true
    }).hashPrefix('!');
    $sceProvider.enabled(false);
    $httpProvider.interceptors.push('authInterceptor');
  }

  routingEvents.$inject = ['$rootScope', '$location', 'Auth'];
  /* @ngInject */
  function routingEvents($rootScope, Auth, $location) {
    //on routing error
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState) {
        //do some logging and toasting
      });

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (!next.authenticate) {
        return;
      }
      Auth.isLoggedInAsync(function(loggedIn) {
        if (!loggedIn || next.role && !Auth.hasRole(next.role)) {
          $location.path('/login');
        }
      });

      if (!next.hasPermission) {
        return false;
      }
      Auth.hasPermission(next.hasPermission, function(hasPermission) {
        if (!hasPermission) {
          $location.path('/account/login');
        }
      });
    });

    //on routing error
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        //do some title setting
        $rootScope.pageTitle = toState.title || 'app';
      });
  }

}());
