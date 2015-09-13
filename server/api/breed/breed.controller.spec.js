'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Breed Endpoints', function () {
  describe('GET /api/breeds', function () {
    it('responds the list of breeds', function (done) {
      request(app)
        .get('/api/breeds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });
});
