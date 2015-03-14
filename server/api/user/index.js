'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//public list
//router.get('/', auth.isAuthenticated(), controller.index);
router.get('/admin', auth.hasRole('admin'), controller.indexAdmin);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id', auth.hasRole('admin'), controller.updateAdmin);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('admin'), controller.createAdmin);

module.exports = router;
