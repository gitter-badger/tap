'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('File Endpoints', function () {
  describe('GET /api/files', function () {
    it('responds the list of files', function (done) {
      request(app)
        .get('/api/files')
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
