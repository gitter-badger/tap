'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Pet Endpoints', function () {
  describe('GET /api/pets', function () {
    it('responds the list of pets', function (done) {
      request(app)
        .get('/api/pets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.resources.should.be.instanceof(Array);
          done();
        });
    });
  });
});
