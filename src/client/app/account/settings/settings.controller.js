(function() {
  'use strict';

  /** @ngdoc controller
   * @name app.account.controller:SettingsCtrl
   *
   * @description
   * Change your passwords
   */

  angular
    .module('app.account')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = [''];

  function SettingsCtrl() {

    /*jshint validthis: true */
    var vm = this;

    activate();

    ////////////////////////////

    function activate() {
      vm.activatation = true;
    }

  }

})();
