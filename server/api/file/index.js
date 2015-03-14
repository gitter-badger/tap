'use strict';

var express = require('express');
var controller = require('./file.controller');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), multipartMiddleware, controller.create);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
