'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');
var Article = require('./article.model');
var router = express.Router();

// Export the configured express router for the article api routes
module.exports = router;

// check if the authenticated user has at least the 'admin' role
//var isAdmin = auth.ensureAdmin;

router.param('article', function(req, res, next, id) {
  var query = Article.findById(id);

  query.exec(function (err, article) {
    if (err) {
      return next(err);
    }
    if (!article) {
      return next(new Error('cant find article'));
    }
    req.article.update({'$inc': {views: 1}}, {w: 1}, function() {});
    req.article = article;
    return next();
  });
});
router.param('id', controller.load);
router.param('author', controller.getListByAuthor);

router.get('/', controller.list);
router.get('/author/:author', controller.getListByAuthor);
router.get('/:id', controller.show);
router.post('/', controller.createArticle);
router.put('/:id', controller.updateArticle);
router.patch('/:id',  controller.updateArticle);
router.delete('/:id', controller.destroy);
