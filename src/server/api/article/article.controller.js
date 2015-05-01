/*jshint node:true*/
'use strict';

var _ = require('lodash');
var async = require('async');
var Article = require('./article.model'),
    Tag = require('../tag/tag.model'),
    User = require('../user/user.model');

// Get list of articles
exports.index = function(req, res) {
  Article.find()
      .sort('-created')
      .populate('author', 'username')
        .exec(function(err, articles) {
          if (err) {
            return handleError(res, err);
          }
          return res.status(200).json(articles);
        });
};

// Get a single post
exports.show = function(req, res) {
  Article.findById(req.params.id)
      .populate('author', 'username')
        .exec(function(err, article) {
          if (err) {
            return handleError(res, err);
          }
          if (!article) {
            return res.sendStatus(404);
          }
          return res.json(article);
        });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  Article.create(_.merge({author: req.user._id}, req.body),
    function(err, article) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(article);
  });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (err) {
      return handleError(res, err);
    }
    if (!article) {
      return res.sendStatus(404);
    }

    // set the new user information if it exists in the request
    if (req.body.title) article.title = req.body.title;
    if (req.body.date) article.date = req.body.date;
    if (req.body.lastUpdated) article.lastUpdated = req.body.date;
    if (req.body.slug) article.slug = req.body.slug;
    if (req.body.description) article.description = req.body.description;
    if (req.body.content) article.content = req.body.content;
    if (req.body.state) article.state = req.body.state;
    if (req.body.tags) article.tags = req.body.tags;
    if (req.body.image) article.image = req.body.image;
    if (req.body.lrgImage) article.lrgImage = req.body.lrgImage;

    article.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (err) {
      return handleError(res, err);
    }
    if (!article) {
      return res.sendStatus(404);
    }
    article.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.sendStatus(204);
    });
  });
};
// TODO: Broken get by author
exports.getListByAuthor = function(req, res, next, author) {
  return User.findOne({
    author: author
  }).exec(function(err, user) {
    if (err) {
      return next(new Error('Find user(' + author + ') failed: ' + err));
    } else if (!user) {
      res.statusCode = 404;
      return res.end();
    } else {
      return Article.find({
        author: req.user._id,
        Status: 'Published'
      }).populate('author', 'username')
                .sort('-created').exec(function(err, articles) {
                  if (err) {
                    return next(new Error(
                      'Failed to load articles of author(' +
                        author + '): ' + err));
                  } else {
                    req.articles = articles;
                    return next();
                  }
                });
    }
  });
};
// TODO: Broken get by tag
exports.getListByTag = function(req, res, next, tagName) {
  return Tag.find({
    TagName: tagName
  }).populate('Article').exec(function(err, tags) {
    var index, t, _i, _len;
    if (err) {
      return next(new Error('Find tag(' + tagName + ') failed: ' + err));
    } else if (!tags || tags.length === 0) {
      res.statusCode = 404;
      return res.end();
    } else {
      for (index = _i = 0, _len = tags.length; _i < _len; index = ++_i) {
        t = tags[index];
        if (t.Article.Status !== 'Published') {
          tags.splice(index, 1);
        }
      }
      return async.map(tags, (function(tag, callback) {
        return tag.Article.populate('author tags', 'name tagName',
                    function(err, article) {
                      if (err) {
                        return callback(err);
                      } else {
                        return callback(null, article);
                      }
                    });
      }), function(err, articles) {
        if (err) {
          return next(err);
        } else {
          req.articles = articles;
          return next();
        }
      });
    }
  });
};

Array.prototype.unique = function() {
  var key, output, _i, _ref, _results;
  output = {};
  _results = [];
  for (key = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref;
    key = 0 <= _ref ? ++_i : --_i) {
    _results.push(output[this[key]] = this[key]);
  }
  return _results;
};

function handleError(res, err) {
  return res.status(500).json(err);
}
