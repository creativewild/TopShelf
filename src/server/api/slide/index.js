'use strict';

var express = require('express');
var controller = require('./slide.controller');
var Slide = require('./slide.model');

var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.show);
router.post('/', auth.hasPermission('editContent'), controller.create);
router.put('/:id', auth.hasPermission('editContent'), controller.update);
router.delete('/:id', auth.hasPermission('editContent'), controller.destroy);

module.exports = router;
