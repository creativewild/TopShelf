'use strict';

var express = require('express');
var controller = require('./file.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.all);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', auth.hasPermission('manageMedia'), controller.update);
router.patch('/:id', auth.hasPermission('manageMedia'), controller.update);
router.delete('/:id', auth.hasPermission('manageMedia'), controller.destroy);

module.exports = router;
