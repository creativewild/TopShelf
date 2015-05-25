(function() {
  'use strict';

  angular
    .module('app.core')
    .directive('topNav', topNav);

  /* @ngInject */
  function topNav() {
    var directive = {
      bindToController: true,
      controller: TopNavCtrl,
      controllerAs: 'vm',
      restrict: 'EA',
      templateUrl: 'app/core/layout/top-nav.tpl.html'
    };

    TopNavCtrl.$inject = ['$scope', '$location', 'Auth'];
    /* @ngInject */
    function TopNavCtrl($scope, $location, Auth) {
      // controllerAs ViewModel
      var vm = this;

      /**
       * Log the user out of whatever authentication they've signed in with
       */
      vm.logout = function() {
        Auth.logout();
        $location.path('/account/login')
        Materialize.toast('See ya later', 3000); // jshint ignore:line
      };

      vm.isCollapsed = true;
      vm.isLoggedIn = Auth.isLoggedIn;
      vm.isAdmin = Auth.isAdmin;
      vm.getCurrentUser = Auth.getCurrentUser;

      /**
       * Currently active nav item when '/' index
       *
       * @param {string} path
       * @returns {boolean}
       */
      vm.isActive = function(path) {
        // path should be '/'
        return $location.path() === path;
      };
    }

    return directive;
  }
})();
