(function () {
  'use strict';
  angular
    .module('app.admin')
    .factory('Resource', Resource);

  Resource.$inject = ['$http'];
  /* @ngInject */
  function Resource($http) {
    console.log('resource.service.js');
    var urlBase = 'api/v1/resources';
    var resourceFactory = {};
    resourceFactory.all = function () {
      return $http.get(urlBase);
    };
    resourceFactory.get = function (id) {
      return $http.get(urlBase + '/' + id);
    };
    resourceFactory.create = function (resourceData) {
      return $http.post(urlBase, resourceData);
    };
    resourceFactory.update = function (id, resourceData) {
      return $http.put(urlBase + '/' + id, resourceData);
    };
    resourceFactory.delete = function (id) {
      return $http.delete(urlBase + '/' + id);
    };
    return resourceFactory;
  }
}());
