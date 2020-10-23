'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/users', controller.getUserList);
router.post('/users', controller.addUser);
router.delete('/:id', controller.destroy);
router.put('/:id/updateUser', controller.updateUser);

module.exports = router;