'use strict';

var User = require('../api/user/user.model');
var config = require('./environment');

User.findOne({email: config.admin.email}, function (err, user) {
  if (err) {
    throw err;
  }
  if (!user) {
    User.create({
      provider: 'local',
      role: 'root',
      name: config.admin.name,
      email: config.admin.email,
      password: config.admin.password
    }, function () {
      console.log('Criando usuário root...');
    });
  }
});
