'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Organization Endpoints', function () {
  describe('GET /api/organizations', function () {
    it('responds the list of organizations', function (done) {
      request(app)
        .get('/api/organizations')
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
