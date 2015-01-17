(function () {
    'use strict';

    function PostFactory ($http) {
        console.log('post.service.js');

        var urlBase = 'api/posts';
        var exports = {};

        exports.getAllPosts = function () {
            return $http.get(urlBase);
        };

        exports.getPostById = function(postId) {
            return $http.get(urlBase + '/' + postId);
        };

        exports.createPost = function(newPost) {
            return $http.post(urlBase, newPost);
        };

        exports.updatePost = function(updatedPost) {
            return $http.put(urlBase + '/' + updatedPost._id, updatedPost);
        };

        exports.removePost = function(postId) {
            return $http.delete(urlBase + '/' + postId);
        };
        exports.upvote = function(updatedPost) {
            return $http.put(urlBase + '/' + updatedPost._id + '/upvote')
                .success(function(data) {
                    exports.upvotes += 1;
                });
        };

        return exports;

    }

    angular
        .module('topshelf.core.services')
        .factory('PostFactory', PostFactory);
})();
