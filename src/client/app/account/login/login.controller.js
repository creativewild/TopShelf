(function() {
  'use strict';

  /** @ngdoc controller
   * @name app.account.controller:LoginCtrl
   *
   * @description
   * Interface to login a registered user
   */
  angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['Auth', '$location', '$window',
    '$rootScope', '$timeout'
  ];
  /* @ngInject */
  function LoginCtrl(Auth, $location, $window, $rootScope, $timeout) {
    var vm = this;

    vm.login = function(loginForm) {
      if (loginForm.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        }).then(function() {
          Materialize.toast('Welcome back!', 3000); //jshint ignore:line
          $timeout(function() {
            $location.path('/');
          });
        }).catch(function(err) {
          vm.errors.other = err.message;
        });
      }
    };

    /**
     * Authenticate the user via Oauth with the specified provider
     *
     * @param {string} provider - (twitter, facebook, github, google)
     */
    vm.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    /**
     * Log the user out of whatever authentication they've signed in with
     */
    vm.logout = function() {
      $location.path('/account/login');
    };
  }
}());
