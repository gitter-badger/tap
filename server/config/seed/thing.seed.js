var Seeder = require('./seeder');
var Thing = require('./../../api/thing/thing.model');

var seeder = new Seeder(Thing);

for (var i = 0; i <= 10; i++) {
  seeder.add({
    name: 'Any Thing ' + i,
    info: 'Created By Seeder'
  });
}

module.exports = seeder;
