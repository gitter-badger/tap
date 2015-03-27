'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: {type: String, required: true},
  phone: {type: Number, required: true},
  email: {type: String, required: true},
  address: {
    street: {type: String, required: true},
    number: {type: String, required: true},
    district: {type: String, required: true},
    city: {type: Schema.Types.ObjectId, ref: 'City', required: true, index: true},
    state: {type: Schema.Types.ObjectId, ref: 'State', required: true, index: true},
    zipCode: {type: Number, required: true},
    complement: {type: String},
    asString: {type: String}
  },
  location: {
    index: '2dsphere',
    type: [Number],
    required: true
  },
  info: String
});

OrganizationSchema.plugin(require('mongoose-created-at'));
OrganizationSchema.plugin(require('mongoose-updated-at'));
OrganizationSchema.plugin(require('mongoose-delete'));

/**
 * Pre-save hook
 */
OrganizationSchema
  .pre('save', true, function (next, done) {
    next();
    this.updateFullAddress(done)
  });

/**
 * Methods
 */
OrganizationSchema.methods = {
  updateFullAddress: function (done) {
    var self = this;
    self.populate('city', function (err) {
      if (err) {
        return done(err);
      }
      self.city.populate('state', function (err, city) {
        if (err) {
          return done(err);
        }
        self.fullAddress = self.street + ', ';
        self.fullAddress += self.number + ', ';
        self.fullAddress += self.district + ' ';
        self.fullAddress += city.name + ' - ';
        self.fullAddress += city.state.acronym;
        self.city = city._id;
        self.state = city.state._id;
        done();
      });
    });
  }
};

module.exports = mongoose.model('Organization', OrganizationSchema);
