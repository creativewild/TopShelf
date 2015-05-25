(function () {
  'use strict';

  /** @ngdoc service
   * @name app.common.service:auth
   *
   * @propertyOf app.common
   * @requires
   * $http
   *
   * @description
   * Service for getting user information
   */
  angular
    .module('app.common')
    .factory('Auth', Auth);

  Auth.$inject = ['$location', '$rootScope', '$http', 'User',
    '$cookieStore', '$q'];

  function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $rootScope.isLoggedIn = true;
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
        $rootScope.isLoggedIn = false;
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            $rootScope.isLoggedIn = true;
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({id: currentUser._id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      // Check if the user's role has the correct permission
      hasPermission: function(permissionName, cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            if (!currentUser.hasOwnProperty('permissions')) {
              cb(false); return false;
            }
            // If user's role is in meanbaseGlobals.roles then check
            // roles to see if user has permission
            // Or if user has allPrivilages
            if (currentUser.permissions.indexOf(permissionName) > -1 ||
                currentUser.permissions.indexOf('allPrivilages') > -1) {
              cb(true);
            } else {
              cb(false);
            }
          }).catch(function() {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('permissions')) {
          // If user's role is in topshelfGlobals.roles
          // then check roles to see if user has permission
          // Or if user has allPrivilages
          if (currentUser.permissions.indexOf(permissionName) > -1 ||
            currentUser.permissions.indexOf('allPrivilages') > -1) {
            cb(true);
          } else {
            cb(false);
          }
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  }
}());
