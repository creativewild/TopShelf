'use strict';

var express = require('express');
var controller = require('./application.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.all);
router.get('/:id', auth.hasRole('admin'), controller.get);
router.post('/', controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'),controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;