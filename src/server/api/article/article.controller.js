/*jshint node:true*/
'use strict';

var _          = require('lodash'),
    async      = require('async'),
    Article    = require('./article.model'),
    helpers    = require('../../components/helpers'),
    CMS        = require('../../components/CMS'),
    collection = new CMS(Article);

var User = require('../user/user.model'); // Linked

function handleError(res, err) {
  return res.status(500).json(err);
}

collection.modifyBody = function(body) {
  if (body && body.url && body.url.charAt(0) !== '/') {
    body.url = '/' + body.url;
  }
  return body;
};

collection.modifyIdentifier = function(identifier) {
  if (identifier && identifier.url && identifier.url.charAt(0) !== '/') {
    identifier.url = '/' + identifier.url;
  }
  return identifier;
};

// Get list of articles
exports.findAll = function(req, res) {
  collection.findAll(req, res);
};

exports.find = function(req, res) {
  collection.find(req, res);
}

exports.create = function(req, res) {
  collection.create(req, res);
};

exports.read = function(req, res) {
  req.article.update({'$inc': {views: 1}}, {w: 1}, function() {});
  res.jsonp(req.article);
};
// Updates pages in the database
exports.update = function(req, res) {
  collection.update(req, res);
};

// Deletes a pages from the DB.
exports.delete = function(req, res) {
  collection.delete(req, res);
};

// Get a single pages
exports.findById = function(req, res) {
  collection.findById(req, res);
};

// Updates an existing page in the DB.
exports.updateById = function(req, res) {
  collection.updateById(req, res);
};

// Deletes a pages from the DB.
exports.deleteById = function(req, res) {
  collection.deleteById(req, res);
};
