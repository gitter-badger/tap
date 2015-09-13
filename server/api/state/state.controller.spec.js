'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('State Endpoints', function () {
  describe('GET /api/states', function () {
    it('responds the list of states', function (done) {
      request(app)
        .get('/api/states')
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
