'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//public list
router.get('/admin', auth.hasRole('admin'), controller.indexAdmin);
router.get('/:id/admin', auth.hasRole('admin'), controller.showAdmin);
router.get('/me', auth.isAuthenticated(), controller.me);
router.post('/admin', auth.hasRole('admin'), controller.createAdmin);
router.put('/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/admin', auth.hasRole('admin'), controller.updateAdmin);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
