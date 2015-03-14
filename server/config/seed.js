/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var File = require('../api/file/file.model');
var Folder = require('../api/folder/folder.model');
var Text = require('../api/text/text.model');

var User = require('../api/user/user.model');

Text.find({}).remove(function () {
  Text.create({
    title: 'Contato',
    body: 'Rua da Caju, 433, Tijucas - SC 88200-000',
    type: 'contact'
  }, function () {
    console.log('Cadastrando textos...');
  });
});

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Folder.find({}).remove(function () {
  Folder.create({
    name: 'root',
    root: true
  }, function (err, root) {
    Folder.create({
      name: 'Dev',
      parentId: root._id
    }, function (err, folder) {
      File.find({}).remove(function () {
        File.create({
          name: "batman.jpg",
          type: "image/jpeg",
          url: "https://byteincoffee.s3.amazonaws.com/.tmp%2F1424693677475-%5Bobject+Object%5D",
          width: 300,
          height: 300,
          folder: folder._id,
          filters: [{
            name: "thumb-batman.jpg",
            url: "https://byteincoffee.s3.amazonaws.com/.tmp%2F1424693676458-thumb-batman.jpg",
            type: "image/jpeg",
            filter: "thumb",
            width: 300,
            height: 300
          }, {
            name: "thumb-batman.jpg",
            url: "https://byteincoffee.s3.amazonaws.com/.tmp%2F1424693676458-thumb-batman.jpg",
            type: "image/jpeg",
            filter: "maxHeight",
            width: 300,
            height: 300
          }],
          "active": true
        }, function () {
          console.log('Cadastrando Arquivos');
        });
      })
    });
  });
});

User.findOne({email: 'test@test.com'}).remove(function () {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function () {
    console.log('Criando usuário test...');
  });
});
