(function() {
  'use strict';

  angular
    .module('app.common')
    .factory('User', User);

  User.$inject = ['$resource'];

  function User($resource) {
    return $resource('/api/v1/users/:id/:controller', {
          id: '@_id'
        },
        {
          changePassword: {
            method: 'PUT',
            params: {
              controller:'password'
            }
          },
          get: {
            method: 'GET',
            params: {
              id:'me'
            }
          }
        });
  }

})();
