'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Folder Endpoints', function () {
  describe('GET /api/folders', function() {
    it('responds the list of folders', function(done) {
      request(app)
        .get('/api/folders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });
});
