'use strict';

var express = require('express');
var controller = require('./breed.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('ong'), controller.create);
router.put('/:id', auth.hasRole('ong'), controller.update);
router.patch('/:id', auth.hasRole('ong'), controller.update);
router.delete('/:id', auth.hasRole('ong'), controller.destroy);

module.exports = router;
