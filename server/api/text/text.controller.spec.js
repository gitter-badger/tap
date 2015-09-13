'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Text Endpoints', function () {
  describe('GET /api/texts', function () {
    it('responds the list of texts', function (done) {
      request(app)
        .get('/api/texts')
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
