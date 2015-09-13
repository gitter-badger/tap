'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('City Endpoints', function () {
  describe('GET /api/cities', function () {
    it('responds the list of cities', function (done) {
      request(app)
        .get('/api/cities')
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
