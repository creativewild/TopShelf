(function () {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.account.controller:AccountCtrl
   *
   * @description
   * Allows for the linking and unlinking of third party accounts and
   * provides the ability to update profile information.
   */
  angular
    .module('app.account')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = ['Auth', 'User'];

  function AccountCtrl(Auth, User) {
    var vm = this;

    vm.errors = {};

    vm.changePassword = function(pwordForm) {
      vm.submitted = true;
      if (pwordForm.$valid) {
        Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
        .then (function() {
          Materialize.toast('Password changed successfully!');
        })
        .catch(function() {
          pwordForm.password.$setValidity('mongoose', false);
          vm.errors.other = 'Incorrect password';
          vm.message = '';
        });
      }
    };

  }
})();
