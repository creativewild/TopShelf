// jscs:disable
// jshint ignore: start
(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.core.ShellCtrl
   * @description
   * Controller
   */
  angular
    .module('app.core')
    .controller('ShellCtrl', ShellCtrl);

  ShellCtrl.$inject = ['Auth', '$rootScope', '$location'];
  /* @ngInject */
  function ShellCtrl(Auth, $rootScope, $location) {
    var vm = this;

    $rootScope.isLoggedIn = Auth.isLoggedIn();
    // Get the current logged in user
    vm.currentUser = Auth.getCurrentUser();

    vm.logout = function() {
      Auth.logout();
      $location.path('/account/login');
    };

    $rootScope.isAdmin = Auth.isAdmin();

    $rootScope.validators = {
      isTitle: /^[A-Za-z0-9@:?&=. _\-]*$/,
      isURI: /(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}(\/[\w~,;\-\.\/?%&+#=]*))/,
      isFilePath: /^[0-9A-Za-z\/*_.\\\-]*$/,
      isCSSClass: /^[A-Za-z0-9_\-*]*$/,
      isAnchorTarget: /^[_blank|_self|_parent|_top]*$/,
      isEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      isText: /^$/,
      isHTML: /^$/
    };

    $rootScope.errorMessages = {
      isTitle: 'Many only contain letters, numbers, and these symbols ( @ : ? & = . _ - ).',
      isURI: "Must be a valid path, either a full address ('http://path.com') or a relative one '/path'",
      isFilePath: 'Must contain only letters, numbers, /, *, _, ., \\, and -',
      isCSSClass: 'May only contain letters, numbers, _, -, and *',
      isAnchorTarget: 'Must be either _blank, _self, _parent, or _top',
      isEmail: 'Must be a valid email format',
      isText: 'Must be safe text',
      isHTML: 'Must be safe html'
    };
  }
})();
