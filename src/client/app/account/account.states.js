/**
 * @ngdoc overview
 * @name app.account
 * @description
 * The `app.account` module
 *
 * @requires ui.router
 */
(function() {
  'use strict';
  angular
    .module('app.account')
    .config(configure);

  configure.$inject = ['$stateProvider'];
  /* @ngInject */
  function configure($stateProvider) {
    $stateProvider.state('account', {
        abstract: true,
        url: '/account'
      })
      .state('account.profile', {
        url: '',
        views: {
          'main@': {
            templateUrl: 'app/account/account.tpl.html',
            controller: 'AccountCtrl',
            controllerAs: 'vm',
            resolve: { /*@ngInject */
              authenticated: function($q, $location, $auth) {
                var deferred = $q.defer();

                if (!$auth.isAuthenticated()) {
                  $location.path('/account/login');
                } else {
                  deferred.resolve();
                }
                return deferred.promise;
              }
            }
          }
        }
      })
      .state('account.login', {
        url: '/account/login',
        views: {
          'main@': {
            templateUrl: 'app/account/login/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          }
        }
      })
      .state('account.logout', {
        url: '/account/logout?referrer',
        referrer: 'home',
        controller: function(Auth) {
          Auth.logout();
        }
      })
      .state('account.signup', {
        url: '/account/signup',
        views: {
          'main@': {
            templateUrl: 'app/account/signup/signup.tpl.html',
            controller: 'SignupCtrl',
            controllerAs: 'signup'
          }
        }
      })
      .state('account.settings', {
        url: '/account/settings',
        templateUrl: 'app/account/settings/settings.tpl.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings',
        authenticate: true
      });
  }
}());
