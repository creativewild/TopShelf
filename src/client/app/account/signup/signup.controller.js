(function() {
  'use strict';

  /** @ngdoc controller
   * @name app.account.controller:SignupCtrl
   *
   * @propertyOf app.account
   *
   * @description
   * The controller relating to user registeration
   */
  angular
    .module('app.account')
    .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject = ['Auth', '$location', '$window', '$timeout'];
  /* @ngInject */
  function SignupCtrl(Auth, $location, $window, $timeout) {
    var vm = this;
    vm.user = {};
    vm.errors = {};

    vm.signup = function(signupForm) {
      if (signupForm.$valid) {
        Auth.createUser({
            username: vm.user.username,
            email: vm.user.email,
            password: vm.user.password
          }).then(function() {
            // Account created, redirect to home
            $timeout(function() {
              $location.path('/');
            });
          })
          .catch(function(err) {
            err = err.data;

            vm.errors = {};
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              signupForm[field].$setValidity('mongoose', false);
              vm.errors[field] = error.message;
            });
          });
      }
    };
    vm.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    }
  }
}());
